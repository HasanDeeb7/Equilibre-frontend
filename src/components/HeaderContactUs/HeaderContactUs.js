import style from  "./HeaderContact.module.css"

const HeaderContactUs = () => {
  return (
    <>
      <header className={style.container}>
        <div className={style.textWrapper}>
        <h1 className={style.title}>Get in Touch with Us</h1>
        <p className={style.subTitle}>
          We're here to help and eager to hear from you. Whether you have a
          question, feedback, or just want to say hello, feel free to reach out
          using the options below. Your satisfaction is our priority.
        </p>
        </div>
        <iframe
        className={style.map}
          title="equilibre location"
          src={
            "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d205.66611058694912!2d35.843441935154914!3d34.43544714714061!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1521f6a72659c15d%3A0x2a359b10012e429d!2skhan%20Al%20Sabboun%20Hajjar!5e0!3m2!1sen!2slb!4v1705656410305!5m2!1sen!2slb"
          }
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </header>
    </>
  );
};
export default HeaderContactUs;
