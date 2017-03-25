#/bin/sh

wget \
     --recursive \
     --no-clobber \
     --page-requisites \
     --html-extension \
     --convert-links \
     --restrict-file-names=windows \
     --domains exp-vegan.blogspot.com.au \
     --no-parent \
exp-vegan.blogspot.com.au
