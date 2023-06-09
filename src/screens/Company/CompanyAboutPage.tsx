import React from 'react';
import './styles.scss';
import { Link } from '@mui/material';
import VerticalTabs from "../../components/tabs/vertical";
import {text} from "../../utils/locales/all_pages";
import PageTitle from "../../components/pagetitle";

const CompanyAboutPage = (): JSX.Element => {

    const {menu_items: t, company_about_page: a, } = text;

    return(
        <main id="company-about-page">
            <div className="content-wrapper">
                <VerticalTabs
                    data={[
                        { title: t.about, route: "/company/about" },
                        { title: t.team, route: "/company/team" },
                        // { title: t.press, route: "/press" },
                        // { title: t.testimonials, route: "/testimonials" },
                        { title: t.play_safe, route: "/playsafe" },
                        { title: t.contact, route: "/company/contact" },
                        { title: t.terms_of_service, route: "/terms" },
                        { title: t.privacy_policy, route: "/privacy" },
                    ]}
                />
                <div className="about-text">
                    <PageTitle title={a.about_title} />
                    <div className="inner-text">
                        <p>{a.main_text_1}</p>
                        <p>{a.main_text_2} <Link href="">{a.main_text_link_1}</Link></p>
                        <p>{a.main_text_3} <Link>{a.main_text_link_2}</Link> {a.main_text_4} <Link>{a.main_text_link_3}</Link> </p>
                        <p>{a.main_text_5} <Link>{a.main_text_link_3}</Link> {a.main_text_6}</p>
                        <p>{a.main_text_7} <Link>{a.main_text_link_5}</Link> {a.main_text_8}</p>
                    </div>
                </div>
            </div>
        </main>
    )
};

export default CompanyAboutPage;