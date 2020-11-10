
# descarga de archivos GEO, guardado y descompresion en carpeta raw/ma_raw_data

wget ftp://ftp.ncbi.nlm.nih.gov/geo/series/GSE17nnn/GSE17400/suppl/GSE17400_RAW.tar --directory raw/ma_raw_data
mkdir ./raw/ma_raw_data/GSE17400
tar -xf ./raw/ma_raw_data/GSE17400_RAW.tar --directory ./raw/ma_raw_data/GSE17400
gunzip ./raw/ma_raw_data/GSE17400/*

wget ftp://ftp.ncbi.nlm.nih.gov/geo/series/GSE33nnn/GSE33267/suppl/GSE33267_RAW.tar --directory raw/ma_raw_data
mkdir ./raw/ma_raw_data/GSE33267
tar -xf ./raw/ma_raw_data/GSE33267_RAW.tar --directory ./raw/ma_raw_data/GSE33267
gunzip ./raw/ma_raw_data/GSE33267/*

wget ftp://ftp.ncbi.nlm.nih.gov/geo/series/GSE45nnn/GSE45042/suppl/GSE45042_RAW.tar --directory raw/ma_raw_data
mkdir ./raw/ma_raw_data/GSE45042
tar -xf ./raw/ma_raw_data/GSE45042_RAW.tar --directory ./raw/ma_raw_data/GSE45042
gunzip ./raw/ma_raw_data/GSE45042/*

wget ftp://ftp.ncbi.nlm.nih.gov/geo/series/GSE56nnn/GSE56677/suppl/GSE56677_RAW.tar --directory raw/ma_raw_data
mkdir ./raw/ma_raw_data/GSE56677
tar -xf ./raw/ma_raw_data/GSE56677_RAW.tar --directory ./raw/ma_raw_data/GSE56677
gunzip ./raw/ma_raw_data/GSE56677/*

# descarga de los archivos de anotacion de geo y guardado en data/resources




