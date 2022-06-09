-- Table: public.answers_photos

-- DROP TABLE IF EXISTS public.answers_photos;

CREATE TABLE IF NOT EXISTS public.answers_photos
(
    id integer NOT NULL DEFAULT nextval('answers_photos_id_seq'::regclass),
    answer_id bigint NOT NULL,
    url character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT answers_photos_pkey PRIMARY KEY (id),
    CONSTRAINT answer_id FOREIGN KEY (answer_id)
        REFERENCES public.answers (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.answers_photos
    OWNER to michaellin;
-- Index: fki_answer_id

-- DROP INDEX IF EXISTS public.fki_answer_id;

CREATE INDEX IF NOT EXISTS fki_answer_id
    ON public.answers_photos USING btree
    (answer_id ASC NULLS LAST)
    TABLESPACE pg_default;