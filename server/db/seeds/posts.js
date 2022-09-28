exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('posts')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {
          id: 1,
          title: 'Sweet Porky',
          date_eaten: '2022-09-22',
          content:
            'He went by so many names, Porky, Number Five, Hong Kong Sweet and Sour Pork, but we can all agree he was special; particularly on Wednesday when he was part of the 2-4-1 deal at Dragon Garden BYO Restaurant. It was purely by chance that I met Porky -one evening after a very hard day at the office. I felt an immediate connection to his super sweetness and his unashamed salty side - we can all can relate, I’m sure. Although we only knew each other for a tragically short time, Porky bought me great comfort and a sense of fulfilment in my moment of need. When I learned that he was no longer with us I was devastated. I was left with feelings of guilt and shame at not taking more time to get to know him. I was also gripped by a hungry inner emptiness much sooner than I imagined possible. Porky was a long way from his humble beginning on a farm in the Waikato, and we mustn’t forget the impact his time hanging around in the Phillipines had on his character and flavour. You brought such richness to my life. I’ll miss you friend.',
          img: 'porky.png',
          auth0_id: 'google-oauth2|117026446347775944394',
          name: 'G SH',
          date_created: '2022-09-22',
        },
        {
          id: 2,
          title: 'Butter Board',
          date_eaten: '2022-09-18',
          content:
            'It caused me huge grief to obliterate close to 100g of butter singlehandedly. Butter has always been there for me, even when I was vegan, butter was a siren, calling to me. Now I’ve succumbed to it’s consumption, it’s soft, greasy embrace. Please forgive me, I hope this hunger doesn’t spread like my sweet butter did. Rest in peace BB.',
          img: 'butter-board.png',
          auth0_id: 'google-oauth2|103547991597142817347',
          name: 'Bougie Bleu',
          date_created: '2022-09-28',
        },
        {
          id: 3,
          title: 'Banana Caramel Cake',
          date_eaten: '2022-09-03',
          content:
            'Omg. I feel soooo bad but this cake was delicious. Can not believe Cakey is dead now!!! It is just like they say… the first is the easiest… Now how will I stop?                    I hope that my family will forgive me. Fortunately I paid in cash so hopefully no evidence? Ahhh!! I don’t even know why I’m posting this… Surely the internet police will find me now? Okay. I have gotta plan my next step… But first - a cafe trip? >:-)',
          img: 'banana-cake.png',
          auth0_id: 'google-oauth2|103547991597142817347',
          name: 'BleuLovesBrunch',
          date_created: '2022-09-29',
        },
        {
          id: 4,
          title: 'Spag Enbelli',
          date_eaten: '2022-09-23',
          content:
            'Goodbye Spag. Some thought it was a mistake that we were friends but I found it deeply rewarding. Lets be honest, things got super messy near the end but that was always in the recipe. Life was certainly more saucy with you at the table.',
          img: 'spaghetti.png',
          auth0_id: 'google-oauth2|117026446347775944394',
          name: 'G SH',
          date_created: '2022-09-23',
        },
        {
          id: 5,
          title: 'Broccoli Bro',
          date_eaten: '2022-09-27',
          content: 'RIP, rest in little pieces my broccoli bro. Cheesy sauce and a pasta bed, you did not deserve to go out this way. When cradling your broccoli arms for the last time I seasoned the boiling water with my tears. It was hard letting you go... but I was hungry, so very hungry! I hope someday you can come to forgive me :(',
          img: 'broccoli.png',
          auth0_id: 'google-oauth2|110785178826811276971',
          name: 'The Boss',
          date_created: '2022-09-28',
        },
        {
          id: 6,
          title: 'Ham-I-Am',
          date_eaten: '2022-09-23',
          content: 'I am Ham. Ham I am. Would you like green lamb and yams? Unfortunately for Mr. Yam on the night of September 23rd I did like yams. I roasted them mercifully in the oven at 180 degrees Celsius for 30 minutes and then promptly consumed them.',
          img: 'yam.png',
          auth0_id: 'google-oauth2|110785178826811276971',
          name: 'Ham',
          date_created: '2022-09-28',
        },
        {
          id: 7,
          title: 'Mother`s Egg',
          date_eaten: '2022-09-28',
          content: 'The egg community lost a valuable member on Wednesday, September 28, 2022. Favorably known as Mr. Pete, who has served his life to a hungry mother of two, including a young baby. Mr. Pete, you`ll be hugely missed. Your life will continue by turning into the form of milk and supporting the mother and the baby`s growth. Your fella will follow your steps and hopefully join you soon.',
          img: 'Screaming_Eggs_.jpeg',
          auth0_id: 'google-oauth2|103547991597142817347',
          name: 'Mum',
          date_created: '2022-09-29',
        },
        {
          id: 8,
          title: 'I ate a potato',
          date_eaten: '2022-09-19',
          content: 'this is a very long string that can be changed later',
          img: 'tomato.png',
          auth0_id: 'google-oauth2|103547991597142817347',
          name: 'John Foo',
          date_created: '2022-09-20',
        },
      ])
    })
}
