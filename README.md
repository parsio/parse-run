# parse-run

Run parse.com application on localhost and web servers.


## Installation

    npm install parse-run -g


## Prepare your project:

in `config/global.json`

add your javascriptKey:

{
    "applications":{
        "myApp": {
            "applicationId": "MYAPP_ID",
            "masterKey" : "MY_MASTER_KEY",
            "javascriptKey": "SET YOUR JS KEY HERE!"
        }
    }
}
and you're done!


## Usage

From your parse app folder, you can now run `parse-run [app name]`, app name is optional.

    # parse-run <app_name>
    
    parse-run live


## Limitations: As you know, Parse provide hooks (beforeSave, afterSave, beforeDelete, afterDelete) and define functions.

Those functions have to be uploaded to the Parse servers using parse deploy or parse develop.

Updating those functions locally without publishing your code to parse have no effect!
