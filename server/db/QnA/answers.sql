-- Table: public.answers

-- DROP TABLE IF EXISTS public.answers;

CREATE TABLE IF NOT EXISTS public.answers
(
    id integer NOT NULL DEFAULT nextval('answers_id_seq'::regclass),
    question_id bigint NOT NULL,
    body character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    answerer_name character varying(60) COLLATE pg_catalog."default" NOT NULL,
    answerer_email character varying(60) COLLATE pg_catalog."default" NOT NULL,
    reported boolean NOT NULL DEFAULT false,
    helpful integer NOT NULL DEFAULT 0,
    date_written bigint DEFAULT EXTRACT(epoch FROM CURRENT_TIMESTAMP),
    "timestamp" timestamp(0) with time zone,
    CONSTRAINT answers_pkey PRIMARY KEY (id),
    CONSTRAINT question_id FOREIGN KEY (question_id)
        REFERENCES public.questions (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.answers
    OWNER to michaellin;
-- Index: fki_question_id

-- DROP INDEX IF EXISTS public.fki_question_id;

CREATE INDEX IF NOT EXISTS fki_question_id
    ON public.answers USING btree
    (question_id ASC NULLS LAST)
    TABLESPACE pg_default;