create database eventos;
use eventos;

create table eventos(
	id_evento INT NOT NULL auto_increment,
    nome_evento VARCHAR(100) NOT NULL,
    data_evento DATE NOT NULL,
    primary key(id_evento)
);
select * from eventos;