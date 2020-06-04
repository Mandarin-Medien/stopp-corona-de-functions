Bei App Start:
1. /configuration
2. /infection-messages

Bei Krankheitsmeldung:
- /request-tan
  - body: ```{ phoneNumber: '+43000000000' }```
  - response: ```{ uuid: 'generated UUID', status: 200 }```
- /infection-info
  - body: ```{ uuid: 'uuid', infectionMessages: [Liste von InfectionMessage] }```
  - InfectionMessage: ```{ message: Verschlüsselte Nachricht, addressPrefix: Erste x Zeichen vom Public Key }```