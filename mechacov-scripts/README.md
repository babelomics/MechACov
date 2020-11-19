# Meta analysis pre-processing

This section contains all the necessary scripts to perform the pre-processing of the curated data
in order to carry out the meta-analysis at gene expression level and at signaling circuit level. Most
of the scripts arguments are self-explanatory but additional info can be found within code documentation.
All the R script can be executed from the terminal and depends on:

* [R 4.0 or higher](https://cran.r-project.org/)
* [hipathia R package](http://bioconductor.org/packages/release/bioc/html/hipathia.html)
* [limma R package](http://bioconductor.org/packages/release/bioc/html/limma.html)

## Hipathia analysis

The `01_ExpressionToHipathia.R` script transforms the gene expression matrix into the signaling circuit activity matrix.

```
Rscript 01_ExpressionToHipathia.R --meta_data_file "example_data/metadata.tsv" --expression_file "example_data/expression.tsv" --normalize_by_length "TRUE" --selected_pathways "hsa04668,hsa04662,hsa04630,hsa04621" --out_file "path_vals.tsv"
```

## Split studies

The `02_split_studies.R` script uses the metadata to split the given matrix (gene expression or circuit signaling activities)
in an intermediate R object that will contain all the required information for the next steps of the meta-analysis.

Example with gene expression data:

```
Rscript 02_split_studies.R --meta_data_file "example_data/metadata.tsv" --matrix_file "example_data/expression.tsv" --contrast_column "group" --numerator_value "infected" --denominator_value "mock" --remove_unused_samples "TRUE" --out_file "splitted_expression.rds"
```

Example with signaling circuit data

```
Rscript 02_split_studies.R --meta_data_file "example_data/metadata.tsv" --matrix_file "path_vals.tsv" --contrast_column "group" --numerator_value "infected" --denominator_value "mock" --remove_unused_samples "TRUE" --out_file "splitted_path_vals.rds"
```

## Limma analysis

The `03a_StudyAnalysis_limma.R` script uses the previously generated RDS object to generate a basic differential expression analysis table
for each study.

Example with gene expression

```
Rscript 03a_StudyAnalysis_limma.R --splitted_data_file "splitted_expression.rds" --numerator_value "infected" --denominator_value "mock" --out_file "limma_expression.tsv"
```

Example with signaling circuit data

```
Rscript 03a_StudyAnalysis_limma.R --splitted_data_file "splitted_path_vals.rds" --numerator_value "infected" --denominator_value "mock" --out_file "limma_path_vals.tsv"
```
# Meta analysis
This section contains scripts to perform different meta-analises from the previously generated pre-processed data.

## MetaMA
The `03b_MetaAnalysis_MetaMA.R` script uses the RDS object generated in the `Split studies` section to generate a diffential expression meta-analysis table.

Example with MetaMA meta-analysis

```
Rscript 03b_MetaAnalysis_MetaMA.R --input "example_data/splitted_path_vals.rds" --output "example_metaMA_results.tsv"
```

## BMRS

TO BE DONE

## MetaDE

TO BE DONE 


# Format results






