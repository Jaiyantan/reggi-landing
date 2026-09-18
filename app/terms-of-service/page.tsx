import type { Metadata } from 'next';
import AnnouncementBar from '@/components/AnnouncementBar';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import StoreInitializer from '@/components/StoreInitializer';
import { getProducts } from '@/lib/getProducts';

export const metadata: Metadata = {
  title: 'Terms & Condition – REGGI',
  description: 'Terms and Conditions governing access to and use of REGGI website and services.',
};

export default async function TermsOfServicePage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-cream text-textDark flex flex-col justify-between">
      <StoreInitializer products={products} />
      <AnnouncementBar />
      <Nav />

      <div className="flex-grow py-[48px] md:py-[80px] px-[16px] sm:px-[24px] md:px-[40px]">
        <div className="max-w-[840px] mx-auto bg-white/70 border border-[#E5DED0] rounded-[24px] p-[24px] sm:p-[36px] md:p-[56px] shadow-sm">
          <h1 className="font-cormorant text-[34px] sm:text-[40px] md:text-[48px] font-bold text-textDark leading-[1.15] mb-[28px] md:mb-[36px]">
            Terms &amp; Condition
          </h1>

          <div className="font-dmSans text-[15px] md:text-[16px] leading-[1.8] text-textDark/90 space-y-[20px]">
            <p>
              Welcome to REGGI, these Terms and Conditions govern your access to and use of our website and services.
            </p>
            <p>
              The website, <a href="https://reggi.in/" className="text-greenDark underline hover:text-greenMid">www.reggi.in</a> is owned by SMART HEALTH, a division of SMART PACKAGING
            </p>
            <p>
              By using our site, you accept these terms in full. If you disagree with any part of the terms, please do not use our website.
            </p>
            <p>
              Eligibility: By using our website, you confirm that you are at least 18 years old or accessing the site under the supervision of a parent or guardian
            </p>
            <p>
              Modifications: We reserve the right to amend these terms at any time. Updates will be posted on this page, and your continued use of the site constitutes acceptance of the changes.
            </p>

            <h2 className="font-cormorant text-[24px] md:text-[28px] font-bold text-textDark pt-[16px]">
              Products and Services
            </h2>
            <p>
              Product Descriptions: We strive to provide accurate descriptions of our products. However, we do not guarantee the health benefits mentioned. REGGI is a natural jujube based product and not intended to diagnose treat cure or prevent any illness or disease
            </p>
            <p>
              Pricing: All prices are listed in INR and are subject to change without prior notice. Any additional charges, such as taxes or shipping fees, will be displayed at checkout.
            </p>
            <p>
              Order Acceptance: We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in pricing, or issues with payment.
            </p>

            <h2 className="font-cormorant text-[24px] md:text-[28px] font-bold text-textDark pt-[16px]">
              Payment Terms
            </h2>
            <p>
              Payment Methods: We accept payments through credit cards, debit cards, UPI, and payment gateway like Razorpay etc. Payment must be completed at the time of purchase.
            </p>
            <p>
              Payment Security: We use secure payment gateways to process transactions. However, we are not responsible for un authorised access or breaches on the payment platform.
            </p>

            <ul className="list-disc pl-[24px] space-y-[16px] pt-[8px]">
              <li>
                <span className="font-semibold">Shipping policy</span>
                <p className="mt-[4px]">
                  Refer to our Shipping and Cancellation Policy for details on shipping timelines, charges, and order tracking.
                </p>
              </li>
              <li>
                <span className="font-semibold">Return and exchange&nbsp;</span>
                <p className="mt-[4px]">
                  Refer to our Return and Exchange Policy for details on returns, refunds, and exchanges.
                </p>
              </li>
              <li>
                <span className="font-semibold">Intellectual Property</span>
                <p className="mt-[4px]">
                  All content on this website, including text, images, logos, and designs, is the property of SMART HEALTH, a division of SMART PACKAGING and protected by applicable copyright and trademark laws. Un authorised use is strictly prohibited.
                </p>
              </li>
              <li>
                <span className="font-semibold">Privacy Policy</span>
                <p className="mt-[4px]">
                  Refer to our Privacy Policy for details
                </p>
              </li>
              <li>
                <span className="font-semibold">Limitation of Liability</span>
                <p className="mt-[4px]">
                  We do our best to ensure the smooth operation of our site , however REGGI, SMART HEALTH OR SMART PACKAGING&nbsp; are not liable for any indirect, incidental, or consequential damages arising from the use or inability to use our website or product..
                </p>
              </li>
              <li>
                <span className="font-semibold">Modifications</span>
                <p className="mt-[4px]">
                  We may revise these terms from time to time. Continued use of our website constitutes your acceptance of any updates.
                </p>
              </li>
            </ul>

            <h2 className="font-cormorant text-[24px] md:text-[28px] font-bold text-textDark pt-[16px]">
              LICENSE
            </h2>
            <p>
              Unless otherwise stated, REGGI, SMART HEALTH, SMART PACKAGING and/or its licensors own the intellectual property rights for all material on REGGI . All intellectual property rights are reserved. You may access this from REGGI&nbsp; for your own personal use subjected to restrictions set in these terms and conditions.
            </p>
            <p>You must not:</p>
            <ul className="list-disc pl-[24px] space-y-[8px]">
              <li>Republish material from REGGI</li>
              <li>Sell, rent or sub-license material from REGGI</li>
              <li>Reproduce, duplicate or copy material from REGGI</li>
              <li>Redistribute content from REGGI</li>
            </ul>

            <p className="font-semibold pt-[12px]">Hyperlinking to our Content</p>
            <p>The following organizations may link to our Website without prior written approval:</p>
            <ul className="list-disc pl-[24px] space-y-[8px]">
              <li>Government agencies;</li>
              <li>Search engines;</li>
              <li>News organizations;</li>
              <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
              <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
            </ul>
            <p>
              These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party’s site.
            </p>
            <p>We may consider and approve other link requests from the following types of organizations:</p>
            <ul className="list-disc pl-[24px] space-y-[8px]">
              <li>commonly-known consumer and/or business information sources;</li>
              <li>dot.com community sites;</li>
              <li>associations or other groups representing charities;</li>
              <li>online directory distributors;</li>
              <li>internet portals;</li>
              <li>accounting, law and consulting firms; and</li>
              <li>educational institutions and trade associations.</li>
            </ul>
            <p>
              We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of Raj’s Kitchen; and (d) the link is in the context of general resource information.
            </p>
            <p>
              These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party’s site.
            </p>
            <p>
              If you are one of the organizations and are interested in linking to our website, you must inform us by sending an e-mail to <a href="mailto:info@reggi.in" className="text-greenDark underline hover:text-greenMid">info@reggi.in</a>
            </p>
            <p>
              Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.
            </p>
            <p>Approved organizations may hyperlink to our Website as follows:</p>
            <ul className="list-disc pl-[24px] space-y-[8px]">
              <li>By use of our corporate name; or</li>
              <li>By use of the uniform resource locator being linked to; or</li>
              <li>By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party’s site.</li>
            </ul>
            <p>
              No use of REGGI logo or other artwork will be allowed for linking absent a trademark license agreement.
            </p>
            <p className="font-semibold pt-[12px]">iFrames</p>
            <p>
              Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.
            </p>
            <p>
              You hereby grant REGGI a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.
            </p>
            <p className="font-semibold pt-[12px]">Reservation of Rights</p>
            <p>
              We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions
            </p>

            <h2 className="font-cormorant text-[24px] md:text-[28px] font-bold text-textDark pt-[16px]">
              CONTENT LIABILITY
            </h2>
            <p>
              We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
            </p>

            <h2 className="font-cormorant text-[24px] md:text-[28px] font-bold text-textDark pt-[16px]">
              DISCLAIMER
            </h2>
            <p>
              To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
            </p>
            <ul className="list-disc pl-[24px] space-y-[8px]">
              <li>limit or exclude our or your liability for death or personal injury;</li>
              <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
              <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
              <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
            </ul>
            <p>
              The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.
            </p>
            <p>
              As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
            </p>

            <h2 className="font-cormorant text-[24px] md:text-[28px] font-bold text-textDark pt-[16px]">
              Contact Information
            </h2>
            <p>
              For queries about these Terms and Conditions, please contact us at:
            </p>
            <p>
              Email: <a href="mailto:info@reggi.in" className="text-greenDark underline hover:text-greenMid">info@reggi.in</a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
      <CartDrawer />
    </main>
  );
}
