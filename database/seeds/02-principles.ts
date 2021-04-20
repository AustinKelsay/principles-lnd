
exports.seed = function(knex: any) {
  // Deletes ALL existing entries
  return knex('principles').del()
    .then(function () {
      // Inserts seed entries
      return knex('principles').insert([
        {
          id: 1, 
          user_id: 2,
          user: 'Bob',
          problem: 'I am consuming too much sugar', 
          diagnosis: 'Sugar consumption is a habit I have developed to cope and reduce stress',
          change: "I am giving my wife 100,000 sats if I eat ANY sugar this month",
          votes: 1
        },
        {
          id: 2, 
          user_id: 2,
          user: 'Bob',
          problem: 'I am too unfocussed during the work day and I am not getting enough done', 
          diagnosis: 'I am not being clear about what I need to get done each day so I default to multitasking and busy-work',
          change: 'Every night I will write down exactly what MUST be done the next day and I will check of these tasks as I complete them',
          votes: 0
        },
        {
          id: 3, 
          user_id: 1,
          user: 'Alice',
          problem: "I'm not using my Bitcoin node I setup 3 months ago", 
          diagnosis: "I was so excited to get my Umbrel node setup but now am a little unsure and intimidated as to how to use the various apps and software",
          change: 'Me and a friend are collaborating to learn one piece of Bitcoin software on our Umbrel node per week and hold each other accountable',
          votes: 0
        },
        {
          id: 4, 
          user_id: 3,
          user: 'Austin',
          problem: "I don't have enough sats!!!", 
          diagnosis: "I'm not stacking proportion to my conviction",
          change: "I setup auto stacking with Swan and am still smash-buying the dip on cashapp. Check out https://swanbitcoin.com/austink",
          votes: 1
        },
        {
          id: 5, 
          user_id: 3,
          user: 'Austin',
          problem: "I am sleeping past my alarm consistently despite going to bed at a decent time", 
          diagnosis: "My body is now habitualized to sleep in so I need a clean approach to re-establish waking up fresh",
          change: "Using the shortcuts app on Iphone I'm now waking up to Tales From The Crypt as my alarm which gets me pumped to take on the day",
          votes: 0
        },
      ]);
    });
};
