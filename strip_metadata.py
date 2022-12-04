import os

#strip image metadata
os.system('exiftool -All= -overwrite_original -ext jpg -ext jpeg -ext png -ext gif . -r')
