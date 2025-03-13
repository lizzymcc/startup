export class FlashcardSet {

	constructor(id,title="",creating_user="",privateset=false,cards=[]) {
	  this.id = id;
	  this.title=title;
	  this.creating_user=creating_user;
	  this.privateset=privateset;
	  this.cards=cards;
	}
  }
