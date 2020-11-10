library(SummarizedExperiment)
if(!require(cowplot)) install.packages("cowplot")
library(cowplot)
library(tibble)
library(tidyverse)

# setwd("..")

rootd <- getwd()
path_to_processed_data <- "raw/ma_expression"
path_to_targetfile <- "raw/microarray_targets.tsv"

cData <- read.delim(path_to_targetfile, stringsAsFactors = F, header=T)

cDataSplitted <- split(cData, f = cData$geo_study) %>% lapply(function(x) {
  rownames(x) <- NULL
  tibble::column_to_rownames(x, var = "column_id")
})

countfiles <- list.files(path = path_to_processed_data, pattern = ".txt$", full.names = T)

countList <- lapply(countfiles, function(x){
  as.matrix(read.table(file = x, header = TRUE, sep = "\t", quote = "", stringsAsFactors = FALSE, row.names = 1))
})

names(countList)

names(countList) <- gsub(countfiles,
                         pattern = ".*expression/",
                         replacement = "") %>% gsub(pattern = "_.*", replacement = "") 
datasets <- names(countList)

x <- datasets[[2]]

seList <- lapply(datasets, function(x) {
  colDat <- cDataSplitted[[x]] 
  m <- countList[[x]]
  rownames(colDat) <- gsub(rownames(colDat), pattern = "[_.].*", replacement = "") 
  m <- m[, rownames(colDat)]
  SummarizedExperiment(m, colData = colDat)
})

# seList

saveRDS(seList, file.path(path_to_processed_data, "SE_normalized_microarray.rds"))