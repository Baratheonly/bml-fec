-- Table: public.questions

-- DROP TABLE IF EXISTS public.questions;

CREATE TABLE IF NOT EXISTS public.questions
(
    id integer NOT NULL DEFAULT nextval('questions_id_seq'::regclass),
    product_id bigint NOT NULL,
    body character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    asker_name character varying(60) COLLATE pg_catalog."default" NOT NULL,
    asker_email character varying(60) COLLATE pg_catalog."default" NOT NULL,
    reported boolean NOT NULL,
    helpful integer NOT NULL,
    date_written bigint,
    "timestamp" timestamp(0) with time zone,
    CONSTRAINT questions_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.questions
    OWNER to michaellin;