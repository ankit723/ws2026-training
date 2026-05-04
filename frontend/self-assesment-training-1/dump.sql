--
-- PostgreSQL database dump
--

\restrict 65j5K9umgIEP1FUFlAsESqsAqZHDneZNUQvKYqw2if1nRi3F1lI2DCKVdRd2Wp4

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Company; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Company" (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    address text NOT NULL,
    owner_id text NOT NULL,
    contact_id text NOT NULL,
    active boolean DEFAULT true NOT NULL
);


ALTER TABLE public."Company" OWNER TO postgres;

--
-- Name: Contact; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Contact" (
    id text NOT NULL,
    contact_name text NOT NULL,
    contact_email text NOT NULL,
    contact_phone text NOT NULL
);


ALTER TABLE public."Contact" OWNER TO postgres;

--
-- Name: Owner; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Owner" (
    id text NOT NULL,
    owner_name text NOT NULL,
    owner_email text NOT NULL,
    owner_phone text NOT NULL
);


ALTER TABLE public."Owner" OWNER TO postgres;

--
-- Name: Product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Product" (
    gtin bigint NOT NULL,
    name text NOT NULL,
    french_name text NOT NULL,
    description text NOT NULL,
    french_description text NOT NULL,
    origin text NOT NULL,
    brand_name text NOT NULL,
    p_weight double precision NOT NULL,
    n_weight double precision NOT NULL,
    g_weight double precision NOT NULL,
    company_id text NOT NULL,
    hidden boolean DEFAULT false NOT NULL,
    "imageUrl" text
);


ALTER TABLE public."Product" OWNER TO postgres;

--
-- Data for Name: Company; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Company" (id, name, email, phone, address, owner_id, contact_id, active) FROM stdin;
14a7f7c1-7e9d-48e7-b28c-015b936792e3	Some	cevw@vfbwtre.gerg	8979797987	ughkvgkuvgkbug	111532d1-c77d-48ca-aecd-a4905f6c8062	6fdd9d93-0126-41cc-8f61-316aae9d8470	t
4702c6fa-3c57-44bb-8aba-93def75b3a93	verwherhrehrh	erthrtehrtehtrh	rtwhqeqterh	terqhheqr	65796428-f4b4-4537-b970-7d8e644e7489	34dec105-a9f7-4804-9731-5dcec75e4c25	t
764741da-2af0-4def-815e-841d10b1e7b2	Tech Morphers	admin@techmorphers.com	9795786303	Pune Hadapsar	18d6bc0d-dc08-4b48-a5d1-f50815e233ea	922fe2e3-52df-49e5-8316-2465a4bfa602	f
\.


--
-- Data for Name: Contact; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Contact" (id, contact_name, contact_email, contact_phone) FROM stdin;
6fdd9d93-0126-41cc-8f61-316aae9d8470	.ihbliyvi	gviugkubuk	hliuhkbuh
34dec105-a9f7-4804-9731-5dcec75e4c25	rwethrwh	hwrtehrtwh	rwhwr
922fe2e3-52df-49e5-8316-2465a4bfa602	Amita Biswas	contact@techmorphers.com	9795786303
\.


--
-- Data for Name: Owner; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Owner" (id, owner_name, owner_email, owner_phone) FROM stdin;
111532d1-c77d-48ca-aecd-a4905f6c8062	vgmjuvgbmjg	vmjgmvjguy@kuvgjmgb.buvyg	jnlihgbvujmyvgvmfju
65796428-f4b4-4537-b970-7d8e644e7489	tqehreh	hretrwh	twrehrehrewh
18d6bc0d-dc08-4b48-a5d1-f50815e233ea	Ankit Biswas	varanasiartist.omg@gmail.com	9795786303
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Product" (gtin, name, french_name, description, french_description, origin, brand_name, p_weight, n_weight, g_weight, company_id, hidden, "imageUrl") FROM stdin;
12345678901234	vrthwrthr	hrthrth	rthrhr	rthrhr	rthreh	erthrthr	43535.34543	5354.54345	534543.6	4702c6fa-3c57-44bb-8aba-93def75b3a93	f	\N
45324653244632	gergerg	eg	erge	erge	gregre	gregre	5354	53434	3454353	4702c6fa-3c57-44bb-8aba-93def75b3a93	f	\N
3454353453455	grgrt	regreg	rege	er	regerg	egerg	345345	543543	345345	4702c6fa-3c57-44bb-8aba-93def75b3a93	f	/uploads/3168356a-4fe3-4b29-9daf-548636e108ab-after.PNG
4353453434555	gwerg	ergwe	gewrggerg	egergeg	gerwgerg	erge	35345	534	45353	4702c6fa-3c57-44bb-8aba-93def75b3a93	f	/uploads/7a5b3999-9481-4166-9e70-c378dbf2aef2-tempsnip.png
\.


--
-- Name: Company Company_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Company"
    ADD CONSTRAINT "Company_pkey" PRIMARY KEY (id);


--
-- Name: Contact Contact_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Contact"
    ADD CONSTRAINT "Contact_pkey" PRIMARY KEY (id);


--
-- Name: Owner Owner_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Owner"
    ADD CONSTRAINT "Owner_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (gtin);


--
-- Name: Company Company_contact_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Company"
    ADD CONSTRAINT "Company_contact_id_fkey" FOREIGN KEY (contact_id) REFERENCES public."Contact"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Company Company_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Company"
    ADD CONSTRAINT "Company_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES public."Owner"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Product Product_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_company_id_fkey" FOREIGN KEY (company_id) REFERENCES public."Company"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

\unrestrict 65j5K9umgIEP1FUFlAsESqsAqZHDneZNUQvKYqw2if1nRi3F1lI2DCKVdRd2Wp4

