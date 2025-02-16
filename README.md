# Ulti.TV Commentators dashboard

## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Gebruik](#gebruik)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving

Ulti.TV wil graag een redesign voor hun commentators dashboard om tijdens wedstrijden de score bij te houden en zichzelf in te lezen over de informatie van de spelers.

Ik heb me bezig gehouden met de volgende user stories:
> As a commentator I want to be able to see the basic details about a single game I will be commentating on, so that I can prepare in advance

> As a commentator I want to be able to see information about a player, so I can enrich my commentary during the live stream.

![mediamodifier_image](https://user-images.githubusercontent.com/60781257/230025742-5c93626b-e2ad-4b5d-97a9-007e96a1baa5.png)

[Live voorbeeld](https://ultitv.onrender.com)

## Kenmerken
Dit is een node.js webapplicatie die gebruik maakt van drie API's Er worden spelers opgehaald, informatie van een wedstreid en informatie over de spelers. Alles wordt met een grid in een one-page gezet zodat de commentators niet al te veel hoven te navigeren over de website.

### Prograsive enhancement
Prograssive enhancement is het beschikbaar maken voor iedereen, zowel computers met of zonder javascript. Alle funcites moeten een fallback hebben.

Tijdens het bouwen van de playerInfo heb ik eerst een functioneel kaal ontwerp gemaakt. Ik heb nu een formulier dat alleen bruikbaar is wanneer JavaScript geladen is. Ik wil dit de volgende sprint omdraaien in JavaScript. Wanneer JavaScript geladen is wordt het formulier verborgen in de plaats van andersom. Ik wil ook cookies instellen voor de user experience. Zo kan de website bijvoorbeeld je dark mode onthouden. Dit moet ik ook met de systeem voorkeur doen.

## Installatie
Download of clone dit project. In de root: `npm install` om alle packages te installeren en `npm start` om de website te starten.

## Gebruik
Je kan op de kaartjes van spelers klikken voor meer informatie. Wanneer je dat doet verdwijnt de puntentelling van de wedstreid tot dat je op het kruisje klikt.

## Bronnen
* [Ulti.TV](https://ulti.tv)
* [Miro](https://miro.com/app/board/uXjVPhWkx8o=/)

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).



## Bronnen

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
