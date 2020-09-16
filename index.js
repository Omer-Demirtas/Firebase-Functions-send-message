const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { user } = require("firebase-functions/lib/providers/auth");

admin.initializeApp();

const db = admin.firestore();

exports.messageSended = functions.firestore.document('/conversation/{chatId}/messages/{messageId}').
    onCreate(async (snapshot, context) => {

        console.log('[info] notification funrcion is starting!');

        const data = snapshot.data();

        //notification json
        const message =
        {
            notification: 
            { 
                title: "Message", 
                body: data.message
            },
        };

        var chatId = context.params.chatId;
        var chatData;

        const chatRef = db.collection('/conversation').doc(chatId);
        const doc = await chatRef.get();
        if (!doc.exists) {
            console.log('No such document!');
        }
        else {
            chatData = doc.data();
            console.log('Document data members:', chatData.members);
        }

        //for get tokens
        let userTokens = [];
        chatData.members.forEach(async item => {
            let tokenRef = db.collection('/profile').doc(item);
            let tokenDoc = await tokenRef.get();
            if (!doc.exists) {
                console.log('No such document!');
            }
            else {
                var user = tokenDoc.data();
                if(data.sender !== user.id){
                    userTokens.push(user.token);
                    admin.messaging().sendToDevice(user.token, message);
                }
            }
        });
    });