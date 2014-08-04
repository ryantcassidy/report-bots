MYHOME=/home/rcassidy
cd /home/rcassidy/output

FOLDERNAME=$(date +%s)
mkdir $FOLDERNAME
cd $FOLDERNAME

$MYHOME/casperjs/bin/casperjs $MYHOME/report-bots/single-tweet.js > out.txt
