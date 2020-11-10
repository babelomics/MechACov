library(hipathia)

# input variables
meta_data_file <- "example_data/metadata.tsv"
expression_file <- "example_data/expression.tsv"
normalize_by_length <- TRUE
selected_pathways <- "hsa04668,hsa04662,hsa04630,hsa04621"

# read tables
meta_data <- read.table(file = meta_data_file, sep = "\t", header = TRUE)
expression_data <-  read.table(file = expression_file, sep = "\t", header = TRUE, row.names = 1)

# split by study ID and create list of matrices
samples_per_study <- split(x = meta_data$column_id, f = meta_data$study_id)
mat_list <- lapply(samples_per_study, function(column_ids) {
  
  out_mat <- expression_data[ , column_ids]
  out_mat <- as.matrix(out_mat)
  return(out_mat)
  
})

# pre-process data from each study
hipathia_expr_list <- lapply(mat_list, function(mat) {
  
  # remove rows with NA or SD = 0
  sd_result <- apply(mat, 1, sd)
  keep <- (sd_result != 0) & (! is.na(sd_result))
  out_mat <- mat[keep,]
  
  # translate IDs and scale to 0-1
  out_mat <- hipathia::translate_data(data = out_mat, species = "hsa")
  out_mat <- hipathia::normalize_data(data = out_mat)
  
  return(out_mat)
  
})

# load hipathia pathways
if (selected_pathways == "") {
  splitted_pathways <- NULL
} else {
  splitted_pathways <- strsplit(x = selected_pathways, split =  ",")[[1]]
}
hipathia_pathways <- hipathia::load_pathways(species = "hsa", pathways_list = splitted_pathways)

# perform hipathia analysis and recover path values
path_vals_list <- lapply(hipathia_expr_list, function(mat) {
  
  hipathia_results <- hipathia::hipathia(genes_vals = mat, metaginfo = hipathia_pathways)
  path_values <- hipathia::get_paths_data(results = hipathia_results, matrix = TRUE)
  
  # normalize by length if required
  if(normalize_by_length) {
    path_values <- hipathia::normalize_paths(path_values, metaginfo = hipathia_pathways)
  }
  
  return(path_values)
  
})

# prepare output matrix and path to name data frame
path_vals_matrix <- Reduce(cbind, path_vals_list)
path_to_name <- data.frame(path_id = rownames(path_vals_matrix))
path_to_name$name <- hipathia::get_path_names(metaginfo = hipathia_pathways, names = path_to_name$path_id)

# write intermediate outputs
write.table(x = path_vals_matrix, file = "path_vals.tsv", sep = "\t", quote = FALSE)
write.table(x = path_to_name, file = "path_to_name.tsv", sep = "\t", quote = FALSE, row.names = FALSE)

