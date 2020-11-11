removedups <- function(elist, annotfile){
  
  # # require(annot, character.only = T)
  # https://www.biostars.org/p/51756/ we want to keep the largest variance per entrez
  RowVar <- function(x, ...) {
    rowSums((x - rowMeans(x, ...))^2, ...)/(dim(x)[2] - 1)
  }
  # order greater to smaller variance
  rv <- RowVar(elist$E)
  
  elist <- elist[order(rv, decreasing = T),] 
  # from now on, it's ordered: greater to smaller variance
  
  # we keep only the value of the first probe found with each name, which will have the greater variance
  print(paste0("Duplicate probes: ", sum(duplicated(elist$genes$ProbeName)), " items removed. Highest variance of values selected."))
  elist <- elist[!duplicated(elist$genes$ProbeName),]
  
  # map the probe ids to entrez ids
  
  # # eidmap <- select(x = eval(parse(text = annot)), keys = elist$genes$ProbeName, columns = "ENTREZID")
  
  annot <- read.csv(annotfile, comment.char = "#", sep = "\t")
  # there are duplicate entries for probes, they are removed:
  annot <- annot[!duplicated(annot$ID),]
  # remove any NAs
  annot <- annot[!is.na(annot$ID),]
  
  rownames(annot) <- annot$ID
  
  if(geoid == "GSE56677"){
    eidmap <- annot[elist$genes$ProbeName, c("ID", "LOCUSLINK_ID")]
  }else if (geoid == "GSE45042"){
    eidmap <- annot[elist$genes$ProbeName, c("ID", "GENE")]
  }else{
    eidmap <- annot[elist$genes$ProbeName, c("NAME", "GENE")]
  }
  
  colnames(eidmap) <- c("PROBEID", "ENTREZID")
  
  # select only the ones with at least an entrez id (remove NAs)
  probenames <- eidmap$PROBEID[!is.na(eidmap$ENTREZID)]  # list of probes that match at least one entrez,
  entrezs <- eidmap$ENTREZID[!is.na(eidmap$ENTREZID)]    # appears as many times as matching entrezs there are
  
  rownames(elist) <- elist$genes$ProbeName
  neweset <- elist[probenames,] # generate new eset, repeating rows when necessary bc there are several matching entrezs
  neweset$genes$ENTREZID <- entrezs
  
  print(paste0("Duplicate entrez IDs: ", sum(duplicated(neweset$genes$ENTREZID)), " items removed. Highest variance of values selected."))
  # they are already sorted per variance, so we simply keep the first one:
  
  neweset <- neweset[!duplicated(neweset$genes$ENTREZID),]
  
  return(neweset)
}
removedupcel <- function(elist, annotfile){
  
  elist <- exprs(elist)
  
  # # require(annot, character.only = T)
  # https://www.biostars.org/p/51756/ we want to keep the largest variance per entrez
  RowVar <- function(x, ...) {
    rowSums((x - rowMeans(x, ...))^2, ...)/(dim(x)[2] - 1)
  }
  # order greater to smaller variance
  rv <- RowVar(elist)
  
  elist <- elist[order(rv, decreasing = T),] 
  # from now on, it's ordered: greater to smaller variance
  
  # we keep only the value of the first probe found with each name, which will have the greater variance
  print(paste0("Duplicate probes: ", sum(duplicated(rownames(elist))), " items removed. Highest variance of values selected."))
  elist <- elist[!duplicated(rownames(elist)),]
  
  # map the probe ids to entrez ids
  
  # # eidmap <- select(x = eval(parse(text = annot)), keys = elist$genes$ProbeName, columns = "ENTREZID")
  
  annot <- read.csv(annotfile, comment.char = "#", sep = "\t")
  # if there are duplicate entries for probes, they are removed:
  annot <- annot[!duplicated(annot$ID),]
  # remove any NAs
  annot <- annot[!is.na(annot$ID),]
  
  rownames(annot) <- annot$ID
  eidmap <- annot[rownames(elist), c("ID", "ENTREZ_GENE_ID")]
  
  # segregate multiple ids to independent columns
  eidmap$ENTREZ_GENE_ID <- as.character(eidmap$ENTREZ_GENE_ID)
  
  s <- strsplit(eidmap$ENTREZ_GENE_ID, split = " /// ")
  eidmap <- data.frame(PROBEID = rep(eidmap$ID, sapply(s, length)), ENTREZID = unlist(s))
  
  
  # select only the ones with at least an entrez id (remove NAs)
  probenames <- eidmap$PROBEID[!is.na(eidmap$ENTREZID)]  # list of probes that match at least one entrez,
  entrezs <- eidmap$ENTREZID[!is.na(eidmap$ENTREZID)]    # appears as many times as matching entrezs there are
  
  neweset <- elist[probenames,] # generate new eset, repeating rows when necessary bc there are several matching entrezs
  # rownames(neweset) <- entrezs
  
  print(paste0("Duplicate entrez IDs: ", sum(duplicated(entrezs)), " items removed. Highest variance of values selected."))
  # they are already sorted per variance, so we simply keep the first one:
  neweset <- neweset[!duplicated(entrezs),]
  
  rownames(neweset) <- entrezs[!duplicated(entrezs)]
  
  return(neweset)
}
plotPCA3 <- function (datos, labels, factor, title, scale, colores, size = 1.5, glineas = 0.25) {
  data <- prcomp(t(datos),scale=scale)
  # plot adjustments
  dataDf <- data.frame(data$x)
  Group <- factor
  loads <- round(data$sdev^2/sum(data$sdev^2)*100,1)
  # main plot1
  p1 <- ggplot(dataDf,aes(x=PC1, y=PC2)) +
    theme_classic() +
    geom_hline(yintercept = 0, color = "gray70") +
    geom_vline(xintercept = 0, color = "gray70") +
    geom_point(aes(color = Group), alpha = 0.55, size = 3) +
    coord_cartesian(xlim = c(min(data$x[,1])-5,max(data$x[,1])+5)) +
    scale_fill_discrete(name = "Group")
  # avoiding labels superposition
  p11 <- p1 + geom_text_repel(aes(y = PC2 + 0.25, label = labels),
                              segment.size = 0.25, size = size) + 
    labs(x = c(paste("PC1",loads[1],"%")),y=c(paste("PC2",loads[2],"%"))) +  
    ggtitle(paste("Principal Component Analysis for: ",title,sep=" "))+ 
    theme(plot.title = element_text(hjust = 0.5)) +
    scale_color_manual(values=colores)
  # main plot 2
  p2 <- ggplot(dataDf,aes(x=PC1, y=PC3)) +
    theme_classic() +
    geom_hline(yintercept = 0, color = "gray70") +
    geom_vline(xintercept = 0, color = "gray70") +
    geom_point(aes(color = Group), alpha = 0.55, size = 3) +
    coord_cartesian(xlim = c(min(data$x[,1])-5,max(data$x[,1])+5)) +
    scale_fill_discrete(name = "Group")
  # avoiding labels superposition
  p22 <- p2 + geom_text_repel(aes(y = PC3 + 0.25, label = labels),
                              segment.size = 0.25, size = size) + 
    labs(x = c(paste("PC1",loads[1],"%")),y=c(paste("PC3",loads[3],"%"))) +  
    theme(plot.title = element_text(hjust = 0.5)) +
    scale_color_manual(values=colores)
  
  pp <- gridExtra::grid.arrange(p11, p22, nrow=2)
  pp
}

