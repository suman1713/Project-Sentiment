# Feed my Mood
![alt text](https://github.com/suman1713/Project-Sentiment/blob/master/public/assets/img/feedmymood_demo.gif")

Our web app uses **Oauth authentication** to utilize existing Twitter credentials for logging into the app. After being verified, the app pulls tweets from User's Twitter feed through **Twitter API**.

Each tweet is then sent to **Watson Tone Analyzer API** that classifies each tweet zeroing around five simple emotions: **anger, disgust, joy, sadness, and fear.** Each emotion has range from 0-1 which can be adjusted to user-desired level using the sliders provided in our app.
