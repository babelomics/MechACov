#!/usr/bin/env Rscript
# input: matrixes of Genes/circuits differentially expressed per experiment/s selected, meta-analysis
# output: Json with the matrixes generated from the analysis and the metadata information for the plots representation.
# output format: .json file.

#########################################
###   Load libraries input files    #####
#########################################

#### Load libraries input files  #####

pacman::p_load("argparser","rentrez","reutils","utils","dplyr","tidyr", "data.table", "jsonlite", "magrittr")


argp = arg_parser("Translates a list of matrixes into a Json file")
argp = add_argument(argp, "--input", help = "file path to the list of matrixes from the results and the metadata")
argp = add_argument(argp, "--output", help = "file path of jsol file with the information for plots")
argv = parse_args(argp)


#######################
###  safety checks  ###
#######################
for (argname in c("input", "output")) {
  if (is.na(argv[argname]) || is.null(argv[argname])) {
    msg = paste0("Required argument missing: --", argname)
    write(msg, stderr())
    print(argp)
    stop(msg)
  }
}
if (is.na(argv$input) || is.null(argv$input) || !file.exists(argv$input)) {
  msg = paste(argv$input, "not found")
  write(msg, stderr())
  print(argp)
  stop(msg)
}

#######################
###    Main Code    ###
#######################

# argv$input = file.path("/home/m3m/INFO_PROYECTO/Biohackathon_020/results/")
# argv$output = file.path( "/home/m3m/INFO_PROYECTO/Biohackathon_020/json/")

list_files <- list.files(argv$input)

data_load <- lapply(list_files, function(x) fread(paste0(argv$input,x), header = T)) 
names(data_load) <- gsub(".txt", "", list_files) %>% gsub(".tsv", "", .) 

### Create a function to perform transformations to the matrixes in order to turn them into json correctly ####

matrix_toJson <- function(matrix){
  
  ## Clean matrix from NA rows
  matrix <- na.omit(matrix)

  ## Create a list corresponding to each column of the matrix or data frame  
  json_matrix <- split.default(matrix, 1:ncol(matrix))
  names(json_matrix) <- colnames(matrix)
  
  ## Structure the list so that each column has the name of the column, the values and the display name for the plot
  for (i in names(json_matrix)){
        json_matrix[[i]] <- list(values = json_matrix[[i]][[i]], display_name = i)
      }

  return(json_matrix) 
}   

## Apply the function and convert the list of list with all the data for the plots into a single json file
  
list_matrixes <- lapply(data_load, function(x){matrix_toJson(x)} ) 

# output results
if (length(list_matrixes) > 1){

  jsonOut <- jsonlite::toJSON(list_matrixes, pretty = T,factor = "integer")
  write(paste(jsonOut), file = file.path(argv$output, paste0("data_results.json")))
  
} else {
  msg = "No significant results"
  write(msg, stderr())
  stop(msg)
}
