echo "_____________________________ Beginning Pre-Deploy Build _____________________________"
mkdir public 
cp -a $TRAVIS_BUILD_DIR/src/ $TRAVIS_BUILD_DIR/public/
cd public && ls
echo "_____________________________ Beginning Deploy _____________________________"