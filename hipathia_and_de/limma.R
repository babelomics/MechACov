library(limma)

# input variables
meta_data_file <- "example_data/metadata.tsv"
expression_file <- "example_data/expression.tsv"
path_vals_file <- "path_vals.tsv"
path_to_name_file <- "path_to_name.tsv"
contrast_column <- "group"
numerator_value <- "infected"
denominator_value <- "mock"
covariates <- ""
remove_unused_samples <- TRUE

# read tables
meta_data <- read.table(file = meta_data_file, sep = "\t", header = TRUE)
expression_data <- read.table(file = expression_file, sep = "\t", header = TRUE, row.names = 1)
path_vals <- read.table(file = path_vals_file, sep = "\t", header = TRUE, row.names = 1)
path_to_name <- meta_data <- read.table(file = path_to_name_file, sep = "\t", header = TRUE)

# remove unused samples from the analysis if required
if(remove_unused_samples) {
  filtered_meta_data <- subset(meta_data, meta_data[ , contrast_column] %in% c(numerator_value, denominator_value))
} else {
  filtered_meta_data <- meta_data
}

# split expression and path vals using study id
samples_per_study <- split(x = filtered_meta_data$column_id, f = filtered_meta_data$study_id)
mat_list <- lapply(samples_per_study, function(column_ids) {
  
  expression <- as.matrix(expression_data[ , column_ids])
  path_vals <- as.matrix(path_vals[ , column_ids])
  out_list <- list(expression = expression, path_vals = path_vals)
  
  # filter features with sd = 0 or NA
  out_list <- lapply(out_list, function(mat) {
    
    sd_result <- apply(mat, 1, sd)
    keep <- (sd_result != 0) & (! is.na(sd_result))
    out_mat <- mat[keep, ]
    return(out_mat)
    
  })
  
  return(out_list)
  
})

# iterate through studies, performing limma analysis and outputting DE table
studies <- names(samples_per_study)
de_list <- lapply(studies, function(study) {
  
  # get meta data for given study
  int_meta_data <- subset(filtered_meta_data, study_id == study)
  
  # interactive creation of basic design matrix 
  base_formula <- paste0("~ 0 + ", contrast_column)
  
  # try to create covariate design matrix
  if(covariates == "") {
    
    design_matrix <- model.matrix(as.formula(base_formula), data = int_meta_data)
    
  } else {
    
    covariate_formula <- paste(base_formula, covariates, sep = " + ")
    design_matrix <- model.matrix(as.formula(covariate_formula), data = int_meta_data)
    
  }
  
  # remove contrast column name from design matrix
  colnames(design_matrix) <- gsub(pattern = contrast_column, replacement = "", colnames(design_matrix))
  
  # create contrast matrix
  contrast <- paste0(numerator_value, "-", denominator_value)
  contrast_matrix <- limma::makeContrasts(contrasts = contrast, levels = design_matrix)
  
  # perform limma analysis
  limma_result_list <- lapply(mat_list[[study]], function(mat) {
    
    fit <- limma::lmFit(object = mat, design = design_matrix)
    fit2 <- limma::contrasts.fit(fit, contrasts = contrast_matrix)
    fit2 <- limma::eBayes(fit2)
    res_df <- limma::topTable(fit2, coef = contrast, number = Inf)
    res_df <- cbind("feature_id" = rownames(res_df), res_df)
    res_df <- cbind("study_id" = study, res_df)
    return(res_df)
    
  })
  
  return(limma_result_list)
  
})
names(de_list) <- studies

# prepare output tables
expression_de <- Reduce(rbind, lapply(de_list, function(x) x[["expression"]]))
path_vals_de <- Reduce(rbind, lapply(de_list, function(x) x[["path_vals"]]))

# map circuit id to name
path_mapper <-path_to_name$name
names(path_mapper) <- path_to_name$path_id
path_vals_de$feature_id <- path_mapper[path_vals_de$feature_id]

# write intermediate outputs
write.table(x = expression_de, file = "expression_de.tsv", sep = "\t", quote = FALSE)
write.table(x = path_vals_de, file = "path_vals_de.tsv", sep = "\t", quote = FALSE)





