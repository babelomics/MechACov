# metaCovid
# Inmaculada Alamo-Alvarez, Macarena Lopez-Sanchez, Martin Garrido Rodriguez-Cordoba

# setwd("..")
rootd <- getwd()
path_to_targetfile <- "raw/microarray_targets.tsv"
path_to_processed_data <- "raw/ma_expression"
path_to_rawdata <- "raw/ma_raw_data"
path_to_resources <- "data/resources"
path_to_results <- "results"

{
# rootd <- "/home/mialaalv/projects/metaCovid/"
# path_to_targetfile <- "sample_info/microarray_targets.tsv"
# path_to_processed_data <- "processed_data"
# path_to_rawdata <- "raw_data"
# path_to_resources <- "resources"
# path_to_results <- "results"
# dir.create(file.path(rootd, "scripts", "logs"), showWarnings = FALSE)

# zz <- file("./scripts/logs/log_ma_processing_msg.txt", open="wt")
# sink(zz, type="message")
# 
# oo <- file("./scripts/logs/log_ma_processing_out.txt", open="wt")
# sink(oo, type="output")
}

dir.create(file.path(rootd, path_to_results, "ma_QC"), showWarnings = FALSE)
dir.create(file.path(rootd, path_to_results, "figures"), showWarnings = FALSE)
dir.create(file.path(rootd, "src", "logs"), showWarnings = FALSE)

setwd(rootd)

zz <- file("./src/logs/log_ma_processing_msg.txt", open="wt")
sink(zz, type="message")

oo <- file("./src/logs/log_ma_processing_out.txt", open="wt")
sink(oo, type="output")

{
  library(Biobase)
  library(arrayQualityMetrics)
  library(limma)
  library(dplyr)
  library(ggplot2)
  library(ggrepel)
  library(oligo)
}

# Funciones propias:
source("src/functions_mialaalv.R")

targetfile <- read.delim(path_to_targetfile)
colnames(targetfile)[2] <- "FileName"

# complete path to files
targetfile$FileName <- paste0(path_to_rawdata, "/", targetfile$geo_study, "/", targetfile$geo_study, "_RAW/", targetfile$FileName)

geoids <- c("GSE33267", "GSE45042", "GSE56677", "GSE17400")

# AGILENT
for(geoid in geoids[1:3]) {

  targetinfo <- targetfile[which(targetfile$geo_study == geoid), ]
  EList <- limma::read.maimages(targetinfo, source = "agilent.median", green.only = T)
  y <- limma::backgroundCorrect(EList)
  
  eset <- ExpressionSet(
    EList$E,
    featureData = as(EList$genes, 'AnnotatedDataFrame'),
    annotation = "hgug4112a.db",
    phenoData = as(EList$targets, 'AnnotatedDataFrame')
  )
  
  # get quality report pre-normalization
  arrayQualityMetrics(eset, outdir = paste0(path_to_results, "/ma_QC/", geoid, "_QCDir_Raw"), force = T)
  
  png(paste0(path_to_results, "/figures/", geoid, "_raw.png"), width = 2000, height = 1000)
  boxplot(y$E, cex.axis=0.5, las=2,
          col = "white",
          main=paste0("Boxplot de intensidades de los arrays: ", geoid, " Datos Crudos"))
  dev.off()
  
  png(paste0(path_to_results, "/figures/", geoid, "_raw_PCA.png"), width = 750, height = 1250)
  # pca after just background correction
  plotPCA3(y$E, labels =  gsub(y$targets$FileName,
           pattern = ".*RAW/", replacement = "") %>% gsub(pattern = "_.*", replacement = ""), factor = y$targets$group, 
           title=paste0(geoid, " Raw data"), scale = FALSE, size = 3, 
           colores = c("skyblue", "tomato"))
  dev.off()
  
  y <- limma::normalizeBetweenArrays(EList, method = "quantile")
  
  if(geoid == "GSE33267"){
  eset_new <-
    removedups(y, paste0(path_to_resources, "/", geoid, "_annot_file.txt"))
  
  } else{
    eset_new <-
      removedups2(y, paste0(path_to_resources, "/", geoid, "_annot_file.txt"))
  }
  
  saveRDS(eset_new,
          paste0(path_to_processed_data, "/", geoid, "_processed.rds"))
  colnames(eset_new) <-
    gsub(colnames(eset_new),
         pattern = ".*RAW/",
         replacement = "") %>% gsub(pattern = "_.*", replacement = "")
  rownames(eset_new) <- eset_new$genes$ENTREZID
  write.table(eset_new$E,
              paste0(path_to_processed_data, "/", geoid, "_processed.txt"), quote = F, sep="\t")
  
  eset_norm <- ExpressionSet(
    y$E,
    featureData = as(EList$genes, 'AnnotatedDataFrame'),
    annotation = "hgug4112a.db",
    phenoData = as(EList$targets, 'AnnotatedDataFrame')
  )
  
  # get quality report post-normalization
  arrayQualityMetrics(eset_norm, outdir = paste0(path_to_results, "/ma_QC/", geoid, "_QCDir_Norm"), force = T)
  
  png(paste0(path_to_results, "/figures/", geoid, "_norm.png"), width = 2000, height = 1000)
  boxplot(eset_new$E, cex.axis=0.5, las=2, col = "white",
          main=paste0("Boxplot de intensidades de los arrays: ", geoid, " Datos Normalizados"))
  dev.off()
  
  png(paste0(path_to_results, "/figures/", geoid, "_norm_PCA.png"), width = 750, height = 1250)
  plotPCA3(eset_new$E, labels = gsub(eset_new$targets$FileName,
                                     pattern = ".*RAW/", replacement = "") %>% gsub(pattern = "_.*", replacement = "") , factor = eset_new$targets$group, 
           title=paste0(geoid, " Normalized data"), scale = FALSE, size = 3, 
           colores = c("skyblue", "tomato"))
  dev.off()
}


# AFFYMETRIX
{
  geoid <- geoids[4]
  
  # generate annotated data frame with file names and sample information
  my.targets <- targetfile[which(targetfile$geo_study == geoid), ]
  rownames(my.targets) <- my.targets$FileName
  my.targets <- as(my.targets, "AnnotatedDataFrame")
  
  # read the cel files
  rawData <-
    read.celfiles(my.targets$FileName, phenoData = my.targets)
  
  # shorten sample names in phenodata
  rawData@phenoData@data$FileName <- gsub(rawData@phenoData@data$FileName,
                                          pattern = ".*_RAW/",
                                          replacement = "") %>%gsub(., pattern = ".CEL$", replacement = "")
  
  rownames(pData(rawData)) <- rawData@phenoData@data$FileName
  
  # shorten sample names in gene expression df
  colnames(rawData) <- rownames(pData(rawData))
  
  library(arrayQualityMetrics)
  arrayQualityMetrics(rawData, outdir = paste0(path_to_results, "/ma_QC/", geoid, "_QCDir_Raw"), force=T)
  
  png(paste0(path_to_results, "/figures/", geoid, "_raw.png"), width = 2000, height = 1000)
  boxplot(
    rawData,
    col = "white",
    cex.axis = 0.5,
    las = 2,
    main = paste0("Boxplots de intensidades de los arrays: ", geoid, " Datos Crudos")
  )
  dev.off()
  
  png(paste0(path_to_results, "/figures/", geoid, "_raw_PCA.png"), width = 750, height = 1250)
  plotPCA3(rawData@assayData$exprs, labels = gsub(rawData@phenoData@data$FileName,
                                     pattern = ".*RAW/", replacement = "") %>% gsub(pattern = "_.*", replacement = "") ,
           factor = rawData@phenoData@data$group, 
           title=paste0(geoid, " Raw data"), scale = FALSE, size = 3, 
           colores = c("skyblue", "tomato"))
  dev.off()
  
  eset_rma <- rma(rawData)
  arrayQualityMetrics(eset_rma, outdir = paste0(path_to_results, "/ma_QC/", geoid, "_QCDir_Norm"), force=T)
  
  png(paste0(path_to_results, "/figures/", geoid, "_norm.png"), width = 2000, height = 1000)
  boxplot(
    eset_rma,
    cex.axis = 0.5,
    col="white",
    las = 2,
    main = paste0("Boxplots de intensidades de los arrays: ", geoid," Datos Normalizados por RMA")
  )
  dev.off()
  
  png(paste0(path_to_results, "/figures/", geoid, "_norm_PCA.png"), width = 750, height = 1250)
  plotPCA3(eset_rma@assayData$exprs, labels = gsub(eset_rma@phenoData@data$FileName,
                                                  pattern = ".*RAW/", replacement = "") %>% gsub(pattern = "_.*", replacement = "") ,
           factor = eset_rma@phenoData@data$group, 
           title=paste0(geoid, " Normalized data"), scale = FALSE, size = 3, 
           colores = c("skyblue", "tomato"))
  dev.off()
  
  # colnames(eset_rma)
  eset_rma_filtered <-
    removedupcel(eset_rma, paste0(path_to_resources, "/", geoid, "_annot_file.txt")) # uses our own function to filter
  
  saveRDS(eset_rma_filtered,
          paste0(path_to_processed_data, "/", geoid, "_processed.rds"))
  write.table(eset_rma_filtered,
              paste0(path_to_processed_data, "/", geoid, "_processed.txt"), quote = F, sep="\t")
}

sessionInfo()

sink(type="message")
close(zz)
sink(type="output")
close(oo)

