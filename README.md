# Alexa Number Test

Detecting large numbers reliably with Amazon Alexa. This test app largely 
deals with problems of number recognition in German. The language mode is 
not completely implemented, yet. There is basic recognition for numbers
between 1 and 100 and advanced recognition - including dialects - for numbers
between 1 and 20. 
 
## Making the skill run

Go to ```lambda/custom``` and install all node modules:

    cd lambda/custom
    npm install

The skill is setup to be installed via the ```ask cli```.
Run ```ask deploy``` in the root folder of the repo.

If you need support setting up ask cli you may check the quickstart guide located
here: https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html
      
## Using the skill

After deploying the skill, you can start it by saying:
 
    "Alexa, starte Zahlentest"
 
Possible test cases (with negative results):

    "Zahlenerkennung mit Amazon Number für 12 34 23 0 1"
    "Zahlenerkennung mit Amazon Number für 56 0 2"
    "Zahlenerkennung mit Amazon Number für 0 8 0 5 6"
    
Possible test cases (with positive results):

    "Zahlenerkennung für 12 34 23 0 1"
    "Zahlenerkennung für 56 0 2"
    "Zahlenerkennung für 0 8 0 5 6"
    
## Running the skill locally

Install ngrok and run it on port 3000

    ./ngrok http 3000
    
Go to folder ```lambda/custom``` and run

    node test.js
    
Go to Amazon Developer Console and enter the ngrok-https-URL as https 
backend in the configuration settings of your skill. The URL is shown
in the console after starting ngrok.

## Need help?

Contact us at hello@dave42.com.