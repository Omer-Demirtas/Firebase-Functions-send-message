## Fireabase Functions ile mesaj yollama

Flutter ile yazdığım mesajlaşma uygulamasına mesaj yollandığında bildiirim gönermek için yazdığım **Firebase Functions**.

## Deteylar 

Sunucumuz firestore'da 

```/conersatiob/{chatId}/message/{messageId]```

adresine herhangi bir ekleme veya oluşturma durumunda,

Firesotre dan çektiği kullanıcı tokenlarına mesaj yollar.

* **burada {} ile ifade edilen herhangi bir bir id de oluşan ekleme ve çıakrma eylemleri**
