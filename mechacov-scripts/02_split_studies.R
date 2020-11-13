library(limma)

# capture script arguments
args <- commandArgs(trailingOnly = FALSE)

# path to the meta data file
meta_data_file <- args[grep("--meta_data_file",args)+1]
# path to the matrix file
matrix_file <- args[grep("--matrix_file",args)+1]
# name of the column to be used for contrasts in the meta_data_table
contrast_column <- args[grep("--contrast_column",args)+1]
# contrast column value that will be used as the numerator in the comparison
numerator_value <- args[grep("--numerator_value",args)+1]
# contrast column value that will be used as the denominator in the comparison
denominator_value <- args[grep("--denominator_value",args)+1]
# wether to remove samples that are not labeled with the groups that will be compared
remove_unused_samples <- as.logical(args[grep("--remove_unused_samples",args)+1])
# path to the intermediate RDS file
out_file <- args[grep("--out_file",args)+1]

# read tables
meta_data <- read.table(file = meta_data_file, sep = "\t", header = TRUE, stringsAsFactors = FALSE)
matrix_data <- read.table(file = matrix_file, sep = "\t", header = TRUE, row.names = 1)
matrix_data <- as.matrix(matrix_data)

# remove unused samples from the analysis if required
if(remove_unused_samples) {
  filtered_meta_data <- subset(meta_data, meta_data[ , contrast_column] %in% c(numerator_value, denominator_value))
} else {
  filtered_meta_data <- meta_data
}

# split meta_data using study id
meta_data_per_study <- split(x = filtered_meta_data, f = filtered_meta_data$study_id)

# prepare output object with a list of matrixes and classes
out_list <- lapply(meta_data_per_study, function(study_meta_data) {
  
  splitted_data <- matrix_data[ , study_meta_data$column_id]
  splitted_group <- study_meta_data[, contrast_column ]
  names(splitted_group) <- study_meta_data$column_id
  out_list <- list(matrix_data = splitted_data, group = splitted_group)
  return(out_list)
  
})

# write RDS object
saveRDS(out_list, out_file)
