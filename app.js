let model = {
    currentPerson: {},
    allPersons: [
      {
        name: 'Lily Butler',
        score: 2,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/1.jpg'
      },
      {
        name: 'Waller Perry',
        score: 4,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/women/1.jpg'
      },
      {
        name: 'Tammi Donovan',
        score: 5,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/2.jpg'
      },
      {
        name: 'Doreen Flowers',
        score: 4,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/3.jpg'
      },
      {
        name: 'Price Pace',
        score: 2,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/4.jpg'
      },
      {
        name: 'Larson Maldonado',
        score: 1,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/5.jpg'
      },
      {
        name: 'Berg Bolton',
        score: 5,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/women/2.jpg'
      },
      {
        name: 'Mack Lott',
        score: 3,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/6.jpg'
      },
      {
        name: 'Rosanna Mcleod',
        score: 4,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/7.jpg'
      },
      {
        name: 'Rosalie Rice',
        score: 1,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/8.jpg'
      },
      {
        name: 'Virginia Buchanan',
        score: 2,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/women/3.jpg'
      },
      {
        name: 'Lorna Stein',
        score: 4,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/9.jpg'
      },
      {
        name: 'Rosalie Steele',
        score: 3,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/women/4.jpg'
      },
      {
        name: 'Wilcox Boyd',
        score: 5,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/10.jpg'
      },
      {
        name: 'Ollie Rice',
        score: 5,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/11.jpg'
      }
    ]
};
//--------------------------------------------------------------------------------
let control = {  
    init: function(){
        sortView.init();
        listView.init();
        scoresView.init();
        profileView.init();
        statusView.init();
        
        this.setCurrentPerson(0);
    },
    //--------------------------------------------------------------------------------
    getAllNames: function(){
      return model.allPersons.map(el => el.name);
    },
    //--------------------------------------------------------------------------------
    getAllScores: function(){
      return model.allPersons.map(el => el.score);
    },
    //--------------------------------------------------------------------------------
    setCurrentPerson: function(index){
      model.currentPerson = model.allPersons[index];
      this.viewCurrentProfile();
      this.viewCurrentStatus()
    },
    //--------------------------------------------------------------------------------
    getCurrentPerson: function(){
      return model.currentPerson
    },
    //--------------------------------------------------------------------------------
    viewCurrentProfile: function(){
      profileView.render(this.getCurrentPerson());
    },
    //--------------------------------------------------------------------------------
    viewCurrentStatus: function() {
      statusView.render(this.getCurrentPerson());
    },
    //--------------------------------------------------------------------------------
    setCurrentPersonScore: function(value){
      model.currentPerson.score = value;
      scoresView.render();
    },
    //--------------------------------------------------------------------------------
    sortUp: function() {
      this.sortModel(-1);
    },
    //--------------------------------------------------------------------------------
    sortDown: function() {
      this.sortModel(1);
    },
    //--------------------------------------------------------------------------------
    sortModel: function(sign) {
      let index = model.allPersons.findIndex( el => el.name === model.currentPerson.name);

      model.allPersons.sort((a, b) => a.name < b.name ? -sign : sign );
      listView.render();
      scoresView.render();
      this.setCurrentPerson(index);
    }
}    
//--------------------------------------------------------------------------------
let sortView = {
  init: function() {
    this.arrows = $('.arrows');
    this.render();
  },
  //--------------------------------------------------------------------------------
  render: function() {
    let liEl, divEl;
    for (let i in control.getAllNames()) {
      liEl = $('<li></li>')
      divEl = $('<div></div>').click(control.sortUp.bind(control));
      liEl.append(divEl);
      divEl = $('<div></div>').click(control.sortDown.bind(control));
      liEl.append(divEl);      
      this.arrows.append(liEl);
    }
  }
}
//--------------------------------------------------------------------------------
let listView = {
    init: function(){      
      this.namesEl = $('.names').first();
      this.render();
    },
    //--------------------------------------------------------------------------------
    render: function(){
      let liEl;
      let namesEl = this.namesEl;
      let children = namesEl.children();
      let childCount = children.length;
      let data = control.getAllNames();

      for (let i in data) {
        if (i < childCount) {
          children.eq(i).text(data[ i ]);
        } else {        
          liEl = $(`<li>${data[i]}</li>`);
          liEl.click(() => this.handleClicks(i))
          namesEl.append(liEl);
        }  
      }      
    },
    //--------------------------------------------------------------------------------
    handleClicks: function(index){
      control.setCurrentPerson(index);
    }
};
//--------------------------------------------------------------------------------
let scoresView = {
    init: function(){      
      this.scoresEl = $('.scores').first();
      this.render();
    },
    //--------------------------------------------------------------------------------
    render: function(){
      let liEl;
      let scoresEl = this.scoresEl;
      let children = scoresEl.children();
      let childCount = children.length;      
      let data = control.getAllScores();

      for (let i in data) {
        if (i < childCount) {
          children.eq(i).children().eq(0).text(data[ i ]);
          children.eq(i).children().eq(1).val(data[ i ]);
        } else {
          let spanEl = $(`<span>${data[i]}</span>`);        
          let inputEl = $(`<input value=\'${data[i]}\'/>`);
          inputEl.hide();
          inputEl.focusout(() => this.handleInput(spanEl, inputEl));
          liEl = $('<li></li>');
          liEl.append(spanEl);
          liEl.append(inputEl);
          liEl.click((event) => this.handleClicks(event, i));
          scoresEl.append(liEl);
        }  
      }      
    },
    //--------------------------------------------------------------------------------
    handleClicks: function(event, index){
      let liEl = $(event.target);
      let spanEl = liEl.children().eq(0);
      let inputEl = liEl.children().eq(1);

      control.setCurrentPerson(index);
      spanEl.hide();
      inputEl.show();      
      inputEl.focus();
    },
    //--------------------------------------------------------------------------------
    handleInput: function(spanEl, inputEl) {
      let person = control.getCurrentPerson();

      person.score = inputEl.val();
      spanEl.text(person.score);
      spanEl.show();
      inputEl.hide();

      control.viewCurrentProfile();
      control.viewCurrentStatus();
    }
};
//--------------------------------------------------------------------------------
let profileView = {
    init: function(){
      let profileEl = $('.profile');
      let children;

      profileEl.append('<img src=\'\'/>');
      profileEl.append('<h3></h3>');
      profileEl.append('<p></p>');

      children = profileEl.children();

      this.img = children.eq(0);
      this.caption = children.eq(1);
      this.score = children.eq(2);
    },
    //--------------------------------------------------------------------------------
    render: function(profile){
      this.img.attr('src', profile.photoUrl);
      this.caption.text(profile.name);
      this.score.text(`Score: ${profile.score}`);
    }
};
//--------------------------------------------------------------------------------
let statusView = {
  init: function() {
    let statusEl = $('.status').first();
    
    this.nameEl = $('<span></span>');
    this.scoreEl = $('<span></span>');
    statusEl.append('Selected person is ');
    statusEl.append(this.nameEl);
    statusEl.append(' Person\'s score is: ');
    statusEl.append(this.scoreEl);
  },
  //--------------------------------------------------------------------------------
  render: function(person) {
    this.nameEl.text(`${person.name}.`);
    this.scoreEl.text(person.score);
  }
}
//--------------------------------------------------------------------------------
window.onload = () => {
  control.init();
}