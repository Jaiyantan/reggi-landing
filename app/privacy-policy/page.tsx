import type { Metadata } from 'next';
import AnnouncementBar from '@/components/AnnouncementBar';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import StoreInitializer from '@/components/StoreInitializer';
import { getProducts } from '@/lib/getProducts';

export const metadata: Metadata = {
  title: 'Privacy Policy – REGGI',
  description: 'Privacy Policy for REGGI.',
};

export default async function PrivacyPolicyPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-cream text-textDark flex flex-col justify-between">
      <StoreInitializer products={products} />
      <AnnouncementBar />
      <Nav />

      <div className="flex-grow py-[48px] md:py-[80px] px-[16px] sm:px-[24px] md:px-[40px]">
        <div className="max-w-[840px] mx-auto bg-white/70 border border-[#E5DED0] rounded-[24px] p-[24px] sm:p-[36px] md:p-[56px] shadow-sm">
          <h1 className="font-cormorant text-[34px] sm:text-[40px] md:text-[48px] font-bold text-textDark leading-[1.15] mb-[28px] md:mb-[36px]">
            Privacy Policy
          </h1>

          <div className="font-dmSans text-[15px] md:text-[16px] leading-[1.8] text-textDark/90 space-y-[20px]">
            <p>
              We at REGGI thinks your privacy is important. Please read this section of our website to learn more about REGGI philosophy and privacy policy.
            </p>
            <p>
              We understand that the protection of privacy is a major concern to many of our customers. We have worked hard to gain your trust by selling only the highest quality food products, and we want to do everything reasonably possible to keep your trust.
            </p>
            <p>
              To build on our relationship, REGGI wants you to understand a little bit about how our website interacts with visitors and how we will use any information gathered when you visit our website. By using our services and viewing this Site, you are consenting to the information collection, use, and disclosure practices described in this privacy policy
            </p>
            <p>
              We employ the use of cookies. By accessing REGGI , you agreed to use cookies in agreement with the REGGI Privacy Policy.
            </p>
            <p>
              Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.
            </p>
            <p>
              REGGI may gather the following types of information:
            </p>
            <p>
              Personal information is given voluntarily while using a feature of this website, for example, during a registration process or purchase, including name, address, phone number, e-mail address, and birth date; financial information, such as credit card number, debit card number and UPI details .
            </p>
            <p>
              Information is gathered as a result of voluntary participation in a survey or poll, or when communicating with our webmaster or customer service Team Members.Information is gathered automatically when visitors visit our website.
            </p>
            <p>
              We may collect information about your computer and your visits to this website such as your IP address, geographical location, browser type, referral source, length of visit, and the number of page views. We may use this information in the administration of this website, to improve the website’s usability, and for marketing purposes. We use cookies on this website. This enables the webserver to identify and track the web browser.
            </p>
            <p>
              We may send a cookie which may be stored on your browser on your computer’s hard drive. We may use the information we obtain from the cookie in the administration of this website, to improve the website’s usability and for marketing purposes. We may also use that information to recognize your computer when you visit our website and to personalize our website for you. Our advertisers may also send you cookies. Most browsers allow you to refuse to accept cookies. This will, however, have a negative impact on the usability of many websites, including this one.
            </p>
            <p>
              REGGI will not sell or otherwise share personally identifying information with other people or non-affiliated companies except to provide services to you at your request, or as required by law. REGGI will share this information with certain business partners to provide some promotional &amp; marketing services to you (eg. Regular offer intimations, emailers, phone calls, etc) or requested services that we do not provide directly.
            </p>
            <p>
              REGGI will only share personally identifying information with these business partners if they agree not to disclose the information to other parties and agree not to use this information to solicit. REGGI may share aggregate data collected through its website that does not personally identify any party with our research partner, and may from time to time share this type of data with other business partners.
            </p>
            <p>
              REGGI may disclose specific information upon governmental request, in response to a court order, when required by law, or to protect our or other’s rights, property, or safety. We do not provide information to these agencies or companies for marketing or commercial purposes. Also, if you participate in any blog or other online forum on our Site, any personal information that you post on the website may be shared with other participants in the forum. In any of these situations, the recipient of the personal information may be located in India or another jurisdiction that may not provide an equivalent level of data protection to the laws in your home country.
            </p>
            <p>
              Except as provided in this privacy policy, we will not provide your information to third parties.We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately, after they are posted on this page. For any queries regarding these Terms and Conditions, please contact us at:&nbsp; Email: <a href="mailto:info@reggi.in" className="text-greenDark underline hover:text-greenMid">info@reggi.in</a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
      <CartDrawer />
    </main>
  );
}
