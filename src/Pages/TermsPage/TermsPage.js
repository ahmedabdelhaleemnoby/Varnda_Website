import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";
import usePageSEO from "../../hooks/usePageSEO";
export default function TermsPage() {
      // Set SEO settings
      usePageSEO({
        title:"شروط الأستخدام",
        keywords: ["شروط الأستخدام"],
      });

  return (
    <div style={{ background: "#eee" }}>
      <Header />
      
      <h2 className="text-center mt-3 mb-4" style={{ color: "blue" }}>
      شروط أستخدام فارندا Varnda
      </h2>

      <p
        dir="rtl"
        className="fs-5 container mb-3 p-2 text-center"
        style={{ background: "#fff", color: "blue", borderRadius: "5px" }}
      >
  بفتحك و تصفحك صفحات الموقع   <Link to="https://varnda.com/" style={{color:"#555"}}>https://varnda.com</Link> فإنك توافق ضمنيا على كافة الشروط و الأحكام المتضمنة في هذه الاتفاقية و التي تنطبق على كافة فروع وأقسام و صفحات الانترنت الخاصة بموقع <Link to="https://varnda.com/" style={{color:"#555"}}>https://varnda.com</Link>
      </p>

      <p
        dir="rtl"
        className="fs-5 container mb-3 p-2 text-center"
        style={{ background: "#fff", color: "blue", borderRadius: "5px" }}
      >
  إذا كنت لا توافق على شروط وأحكام هذه الاتفاقية فيتوجب عليك عدم استخدام الموقع نهائيا.
      </p>

      <p
        dir="rtl"
        className="fs-5 container mb-3 p-2 text-center"
        style={{ background: "#fff", color: "blue", borderRadius: "5px" }}
      >
تحتفظ شركة موقع <Link to="https://varnda.com/" style={{color:"#555"}}>https://varnda.com</Link> بحقها في تعديل شروط و أحكام هذه الاتفاقية دون سابق إنذار, و ينبغي على مستخدم الموقع مراجعة شروط وقواعد الاستخدام بصفة دورية للوقوف على المستجدات.
      </p>

      <div className="fs-5 container my-1 p-2">
        <h4
          dir="rtl"
          style={{ color: "#555", borderRadius: "5px", marginBottom: "8px" }}
        >شروط استخدام الموقع:</h4>
        <p
          dir="rtl"
          className=" p-2"
          style={{ background: "#fff", color: "blue", borderRadius: "5px" }}
        >	ينبغي علي مستخدم الموقع أن يكون عمره 18 عام أو أكثر و اذا كان عمره أقل من 18 عام لا يجوز استخدام الموقع بدون إشراف مباشر من أحد الوالدين أو أحد الأوصياء القانونيين.</p>
          <p
          dir="rtl"
          className=" p-2"
          style={{ background: "#fff", color: "blue", borderRadius: "5px" }}
        >	التعليقات والآراء المنشورة من قبل مستخدمي الموقع تعبر عن آرائهم فقط ولا علاقة للموقع بها.</p>
          <p
          dir="rtl"
          className=" p-2"
          style={{ background: "#fff", color: "blue", borderRadius: "5px" }}
        >	يتعهد و يضمن مستخدم الموقع بتقديم بيانات صحيحة ومحدثة عن نفسه و هويته عند التسجيل أو القيام بعملية اشتراك في خدمة من الموقع مع التعهد بتحديثها كلما طرأ عليها تغيير.</p>
          <p
          dir="rtl"
          className=" p-2"
          style={{ background: "#fff", color: "blue", borderRadius: "5px" }}
        >	يتحمل مستخدم الموقع وحده مسؤولية أمان و سلامة  كلمة المرور أو السر الخاصة بحسابه, و يضمن كافة المعاملات التي تتم باستخدام كلمة المرور الخاصة به و بحسابه دون أدني مسئولية علي الموقع.</p>
          <p
          dir="rtl"
          className=" p-2"
          style={{ background: "#fff", color: "blue", borderRadius: "5px" }}
        >	يحق للموقع نشر و تسجيل و اعادة نشر كل أو بعض أسئلة و مشاركات و تعليقات و آراء أو اقتراحات مستخدمي الموقع لأي غرض من الأغراض التجارية دون الرجوع إليهم و دون أدني مسئولية علي الموقع تجاه محتوى تلك الأسئلة و المشاركات و التعليقات و الآراء أو الاقتراحات.</p>
          <p
          dir="rtl"
          className=" p-2"
          style={{ background: "#fff", color: "blue", borderRadius: "5px" }}
        >	اشتراك مستخدم الموقع في الرسائل الإخبارية و الترويجية اختياري, ويمكن للمستخدم إلغاء اشتراكه في الرسائل الاخبارية و الترويجية في أي وقت بسهولة من خلال الضغط على رابط إلغاء الاشتراك.</p>
          <p
          dir="rtl"
          className=" p-2"
          style={{ background: "#fff", color: "blue", borderRadius: "5px" }}
        >	تصفح واستخدام الموقع فارندا Varnda أو برامجه او تطبيقاته، يعد هذا إقرار بالموافقة على سياسة الخصوصية عند فارندا Varnda. (للاطلاع على سياسة الخصوصية <Link to="/privacy-policy" style={{color:"#555"}}>اضغط هنا </Link> ).</p>
          <p
          dir="rtl"
          className=" p-2"
          style={{ background: "#fff", color: "blue", borderRadius: "5px" }}
        >	حقوق النسخ والنشر والعلامات التجارية.</p>
          <p
          dir="rtl"
          className=" p-2"
          style={{ background: "#fff", color: "blue", borderRadius: "5px" }}
        >	جميع حقوق النشر محفوظة وتخضع جميع محتويات الموقع من نصوص و صور و وسائط  لحماية قوانين الملكية الفكرية بجمهورية مصر العربية.</p>
          <p
          dir="rtl"
          className=" p-2"
          style={{ background: "#fff", color: "blue", borderRadius: "5px" }}
        >	يحظر استخدام محتوى الموقع من نصوص أو صور أو أي وسائط  أو أكواد لأي غرض من الأغراض التجارية بدون اذن مسبق من موقع <Link to="https://varnda.com/" style={{color:"#555"}}>https://varnda.com</Link> ، و في حالة مخالفة ذلك يتحمل المخالف كافة العقوبات و الأضرار القانونية.</p>
      </div>
      <div className="fs-5 container my-1 p-2">
        <h4
          dir="rtl"
          style={{ color: "#555", borderRadius: "5px", marginBottom: "8px" }}
        >القوانين المطبقة و القضاء المختص:</h4>
        <p
          dir="rtl"
          className=" p-2"
          style={{ background: "#fff", color: "blue", borderRadius: "5px" }}
        >	تتم جميع عمليات الشراء علي موقع <Link to="https://varnda.com/" style={{color:"#555"}}>https://varnda.com</Link> و تفسر شروط و أحكام هذه الاتفاقية وفقا لأحكام مشروع نظام التجارة الإلكترونية ومعارض الانترنت و القوانين المتعلقة السارية بجمهورية مصر العربية.</p>
          <p
          dir="rtl"
          className=" p-2"
          style={{ background: "#fff", color: "blue", borderRadius: "5px" }}
        >	تختص محاكم جمهورية مصر العربية دون غيرها بالفصل في كافة المنازعات التي يمكن أن تنشأ بخصوص عمليات الشراء أو بسبب استخدام الموقع <Link to="https://varnda.com/" style={{color:"#555"}}>https://varnda.com</Link> .</p>
    
      </div>
      <Footer />
    </div>
  );
}
