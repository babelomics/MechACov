library(limma)

# capture script arguments
args <- commandArgs(trailingOnly = FALSE)

# path to the splitted data file
splitted_data_file <- args[grep("--splitted_data_file",args)+1]
message("Splitted data file: ", splitted_data_file)
# group value that will be used as the numerator in the comparison
numerator_value <- args[grep("--numerator_value",args)+1]
message("Numerator value: ", numerator_value)
# group value that will be used as the denominator in the comparison
denominator_value <- args[grep("--denominator_value",args)+1]
message("Denominator value: ", denominator_value)
# output table file name
out_file <- args[grep("--out_file",args)+1]
message("Output file: ", out_file)

# read rds
splitted_data <- readRDS(splitted_data_file)

# iterate through studies, performing limma analysis and outputting DE table
de_list <- lapply(names(splitted_data), function(study_id) {
  
  # get study data
  study_data <- splitted_data[[study_id]]
  
  # create design formula to perform contrast
  meta_data <- data.frame(sample_id = names(study_data$group), group = study_data$group)
  design_matrix <- model.matrix(~ 0 + group, data = meta_data)
  
  # remove contrast column name from design matrix
  colnames(design_matrix) <- gsub(pattern = "group", replacement = "", colnames(design_matrix))
  
  # create contrast matrix
  contrast <- paste0(numerator_value, "-", denominator_value)
  contrast_matrix <- limma::makeContrasts(contrasts = contrast, levels = design_matrix)
  
  # perform limma analysis
  fit <- limma::lmFit(object = study_data$matrix_data, design = design_matrix)
  fit2 <- limma::contrasts.fit(fit, contrasts = contrast_matrix)
  fit2 <- limma::eBayes(fit2)
  res_df <- limma::topTable(fit2, coef = contrast, number = Inf)
  res_df <- cbind("feature_id" = rownames(res_df), res_df)
  res_df <- cbind("study_id" = study_id, res_df)
  return(res_df)
  
})

# prepare output tables
de_table <- Reduce(rbind, de_list)

# write intermediate outputs
write.table(x = de_table, file = out_file, sep = "\t", quote = FALSE, row.names = FALSE)
