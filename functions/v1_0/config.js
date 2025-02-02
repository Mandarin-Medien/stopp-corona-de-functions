exports.getConfig = async function(request, response) {
   return response.status(200).send(config)
};


let config = {
    "configuration": {
        "warn_before_symptoms": 72,
        "red_warning_quarantine": 336,
        "yellow_warning_quarantine": 168,
        "self_diagnosed_quarantine": 168,
        "diagnostic_questionnaire": {
            "de": [
                {
                    "title": "1. Frage",
                    "questionText": "Wie geht es Ihnen heute?",
                    "answers": [
                        {
                            "text": "Ich fühle mich gut.",
                            "decission": "HINT"
                        },
                        {
                            "text": "Ich habe Krankheitssymptome.",
                            "decission": "next"
                        }
                    ]
                },
                {
                    "title": "2. Frage",
                    "questionText": "Haben Sie eines der folgenden Symptome:\n* Husten\n* Halsschmerzen\n* Kurzatmigkeit\n* Atemwegsentzündung\n* Plötzlicher Verlust des Geschmack- oder Geruchssinns",
                    "answers": [
                        {
                            "text": "Nein",
                            "decission": "HINT"
                        },
                        {
                            "text": "Ja",
                            "decission": "next"
                        }
                    ]
                },
                {
                    "title": "3. Frage",
                    "questionText": "Haben Sie eine plausible Erklärung dafür?\n(Z.B. Bekannte Allergie zu dieser Zeit, die eines der Symptome auslöst oder eine andere bestätigte Diagnose)",
                    "answers": [
                        {
                            "text": "Ja",
                            "decission": "SELFMONITORING"
                        },
                        {
                            "text": "Nein",
                            "decission": "SUSPICION"
                        }
                    ]
                }
            ],
            "en": [
                {
                    "title": "Question #1",
                    "questionText": "How are you today?",
                    "answers": [
                        {
                            "text": "I feel fine.",
                            "decission": "HINT"
                        },
                        {
                            "text": "I have symptoms of illness.",
                            "decission": "next"
                        }
                    ]
                },
                {
                    "title": "Question #2",
                    "questionText": "Do you have any of the following symptoms:\n* Cough\n* Sore throat\n* Shortness of breath\n* Respiratory Inflammation\n* Sudden loss of the sense of taste or smell",
                    "answers": [
                        {
                            "text": "No",
                            "decission": "HINT"
                        },
                        {
                            "text": "Yes",
                            "decission": "next"
                        }
                    ]
                },
                {
                    "title": "Question #3",
                    "questionText": "Do you have a plausible explanation (e.g. known allergy)?",
                    "answers": [
                        {
                            "text": "Yes",
                            "decission": "SELFMONITORING"
                        },
                        {
                            "text": "No",
                            "decission": "SUSPICION"
                        }
                    ]
                }
            ],
            "nl": [
                {
                    "title": "1. Vraag",
                    "questionText": "Hoe gaat het vandaag?",
                    "answers": [
                        {
                            "text": "Ik voel mij goed.",
                            "decission": "HINT"
                        },
                        {
                            "text": "Ik heb ziekteverschijnselen.",
                            "decission": "next"
                        }
                    ]
                },
                {
                    "title": "2. Vraag",
                    "questionText": "Heb je last van terugkerende, droge hoest zonder plausibele verklaring?",
                    "answers": [
                        {
                            "text": "Nee",
                            "decission": "HINT"
                        },
                        {
                            "text": "Ja",
                            "decission": "SUSPICION"
                        }
                    ]
                }
            ]
        },
        "page_list": {
            "de": {
                "HINT": {
                    "roofline": "Danke für’s Mitmachen!",
                    "title": "Bleiben Sie gesund und helfen Sie, andere zu schützen.",
                    "boldText": "Das können Sie tun",
                    "longText": "In der aktuellen Situation ist es essentiell, dass Sie gut auf sich und andere aufpassen. Waschen Sie sich regelmäßig die Hände, halten Sie ausreichend Abstand zu anderen Menschen und beschränken Sie Ihre sozialen Kontakte auf ein Minimum. Nur so können wir die Verbreitung von COVID-19 verlangsamen und die Versorgung Kranker gewährleisten. Danke für Ihre Mithilfe!"
                },
                "SELFMONITORING": {
                    "roofline": "Ergebnis",
                    "title": "Bitte beobachten Sie Ihre Symptome.",
                    "boldText": "Nächste Schritte",
                    "longText": "1. Bitte messen Sie nach sechs Stunden erneut Fieber. 2. Starten Sie das Formular dann erneut. 3. Halten Sie Ihre sozialen Kontakte soweit gering. So helfen Sie mögliche Ansteckungen niedrig zu halten. Achtung Sollten Sie einen Arztbesuch planen oder ein Krankenhaus aufsuchen wollen, melden Sie sich bitte telefonisch an. So helfen Sie, Ansteckungen niedrig zu halten."
                },
                "SUSPICION": {
                    "roofline": "Ergebnis",
                    "title": "Ihre Symptome entsprechen jenen von COVID-19.",
                    "boldText": "Bitte melden Sie im nächsten Schritt den Verdacht, um andere zu schützen.",
                    "longText": "So können wir anonym Ihre Kontakte benachrichtigen. Aufgrund der aktuellen Situation ist es unumgänglich, dass Sie sich als Verdachtsfall melden und sich präventiv in Quarantäne begeben."
                }
            },
            "en": {
                "HINT": {
                    "roofline": "Danke für’s Mitmachen!",
                    "title": "Bleiben Sie gesund und helfen Sie, andere zu schützen.",
                    "boldText": "Das können Sie tun",
                    "longText": "In der aktuellen Situation ist es essentiell, dass Sie gut auf sich und andere aufpassen. Waschen Sie sich regelmäßig die Hände, halten Sie ausreichend Abstand zu anderen Menschen und beschränken Sie Ihre sozialen Kontakte auf ein Minimum. Nur so können wir die Verbreitung von COVID-19 verlangsamen und die Versorgung Kranker gewährleisten. Danke für Ihre Mithilfe!"
                },
                "SELFMONITORING": {
                    "roofline": "Ergebnis",
                    "title": "Bitte beobachten Sie Ihre Symptome.",
                    "boldText": "Nächste Schritte",
                    "longText": "1. Bitte messen Sie nach sechs Stunden erneut Fieber. 2. Starten Sie das Formular dann erneut. 3. Halten Sie Ihre sozialen Kontakte soweit gering. So helfen Sie mögliche Ansteckungen niedrig zu halten. Achtung Sollten Sie einen Arztbesuch planen oder ein Krankenhaus aufsuchen wollen, melden Sie sich bitte telefonisch an. So helfen Sie, Ansteckungen niedrig zu halten."
                },
                "SUSPICION": {
                    "roofline": "Ergebnis",
                    "title": "Ihre Symptome entsprechen jenen von COVID-19.",
                    "boldText": "Bitte melden Sie im nächsten Schritt den Verdacht, um andere zu schützen.",
                    "longText": "So können wir anonym Ihre Kontakte benachrichtigen. Aufgrund der aktuellen Situation ist es unumgänglich, dass Sie sich als Verdachtsfall melden und sich präventiv in Quarantäne begeben."
                }
            },
            "nl": {
                "HINT": {
                    "roofline": "Bedankt voor je deelname!",
                    "title": "Blijf gezond en help mee om anderen te beschermen.",
                    "boldText": "Dat kan je doen",
                    "longText": "In de huidige situatie is het essentieel dat je goed voor jezelf en anderen zorgt. Was daarom regelmatig je handen, hou voldoende afstand van andere mensen en beperk je sociale contacten tot een minimum. Dit is de enige manier waarop we de verspreiding van het Coronavirus kunnen vertragen. Dank voor je hulp!"
                },
                "SELFMONITORING": {
                    "roofline": "Resultaat",
                    "title": "Let op je symptomen.",
                    "boldText": "Volgende stappen",
                    "longText": "1. Meet je temperatuur na 6 uur opnieuw. 2. Start het formulier opnieuw. 3. Beperkt sociale contacten tot een minimum. Zo help je het aantal infecties laag te houden. Waarschuwing: Indien je verwacht naar de dokter of ziekenhuis te moeten gaan, meld je dan eerst telefonisch om infecties laag te houden."
                },
                "SUSPICION": {
                    "roofline": "Resultaat",
                    "title": "Jouw symptomen komen overeen met COVID-19.",
                    "boldText": "Meld de vermoedelijke infectie in de volgende stap om anderen te beschermen",
                    "longText": "Zo kunnen we je contacten anoniem informeren. Gezien de huidige situatie is het absoluut noodzakelijk dat je een vermoedelijke infectie meld ten jezelf preventief in quarantaine plaatst."
                }
            }
        }
    }
};