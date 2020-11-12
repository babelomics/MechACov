#!/usr/bin/env Rscript
# input: Genes/circuits differentially expressed file (from 02_GeneCircuitExpression2DifferentialExpression.R)
# output: Meta-analysis of genes/circuits differentially expressed
# output format: id, displayName, Effect/pvalue, [confidentInterval]

#install.packages("tidyverse")
#install.packages("metaMA")


library(metaMA)
library(tidyverse)
library(argparser)
argp = arg_parser("Combines moderated effect sizes from different studies to find differentially expressed genes or circuits.")
argp = add_argument(argp, "--input", help="RDS experiment design.")
argp = add_argument(argp, "--output", help="Combined list of differentially expressed genes/circuits.")
argv = parse_args(argp)


#######################
###  safety checks  ###
#######################
for (argname in c("input")) {
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


###############
###  main   ###
###############

# load input file
# studyId, id, displayName, logFC, pvalues
experiment <- readRDS(file = argv$input)

# performs MetaMA analysis
res=EScombination(esets=experiment$esets,classes=experiment$classes)
rawpval=2*(1-pnorm(abs(res$TestStatistic)))
adjpval=p.adjust(rawpval, method = "BH")













