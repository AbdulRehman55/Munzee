import React from 'react';
import './styles.scss';
import { Link } from '@mui/material';
import VerticalTabs from '../../components/tabs/vertical';
import PageTitle from "../../components/pagetitle";
import { text } from '../../utils/locales/all_pages';

const CompanyContactPage = (): JSX.Element => {

    const t = text.company_contact_page;

    return(
        <main id="company-contact-page">
            <div className="content-wrapper">
                <VerticalTabs
                    data={[
                        { title: text.menu_items.about, route: "/company/about" },
                        { title: text.menu_items.team, route: "/company/team" },
                        // { title: text.menu_items.press, route: "/press" },
                        // { title: text.menu_items.testimonials, route: "/testimonials" },
                        { title: text.menu_items.play_safe, route: "/playsafe" },
                        { title: text.menu_items.contact, route: "/company/contact" },
                        { title: text.menu_items.terms_of_service, route: "/terms" },
                        { title: text.menu_items.privacy_policy, route: "/privacy" },
                    ]}
                />
                <div className="contact-text">
                    <PageTitle title={text.menu_items.contact} />
                    <div className="inner-text">
                        <p>{t.main_text}
                            <span>{t.main_text_item_1}</span>
                            <span>{t.main_text_item_2}</span>
                            <span>{t.main_text_item_3}<Link href="mailto:press@freezetag.com">{t.main_text_link}</Link></span>
                        </p>
                        <p>
                            {t.main_text_second_block}
                            <Link href="mailto:support@munzee.com">{t.main_text_support_link}</Link>
                            <Link href="mailto:customervoice@munzee.com">{t.main_text_suggestions_link}</Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
};

export default CompanyContactPage;