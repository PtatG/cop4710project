create table users (
	id int auto_increment,
	primary key (id),
	username varchar(20) not null,
	password varchar(64) not null,
	name varchar(100) default null,
	email varchar(100) default null,
	city varchar(100) default null
);

create table superadmins (
	int id,
	primary key (id),
	foreign key (id) references users(id)
);

create table events (
	eventid int auto_increment,
	primary key (eventid),
	title varchar(100) not null,
	description varchar(1000) default null,
	url varchar(200) default null,
	startdate datetime default null,
	enddate datetime default null,
	address varchar(200) default null,
	city varchar(100) default null,
	state varchar(20) default null,
	zipcode varchar(10) default null,
	organizer int not null,
	foreign key (organizer) references users(id),
	active bit default false
);

create table participants (
	eventid int,
	userid int,
	primary key (eventid, userid),
	foreign key (eventid) references events(eventid),
	foreign key (userid) references users(id)
);
