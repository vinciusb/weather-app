-- Table: public.users

-- DROP TABLE public.users;

CREATE TABLE public.users
(
    id integer NOT NULL,
    first_name character varying(20) COLLATE pg_catalog."default",
    last_name character varying(20) COLLATE pg_catalog."default",
    email text COLLATE pg_catalog."default",
    password character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email),
    CONSTRAINT users_password_key UNIQUE (password)
);

TABLESPACE "TS_WeatherApp_DB";

ALTER TABLE public.users
    OWNER to postgres;
-- Index: users_first_name_last_name_idx

-- DROP INDEX public.users_first_name_last_name_idx;

CREATE UNIQUE INDEX users_first_name_last_name_idx
    ON public.users USING btree
    (lower(first_name::text) COLLATE pg_catalog."default" ASC NULLS LAST, lower(last_name::text) COLLATE pg_catalog."default" ASC NULLS LAST)
    ;