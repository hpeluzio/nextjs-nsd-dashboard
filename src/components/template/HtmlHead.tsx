interface Props {
  title: string;
  description: string;
  children?: any;
}

const HtmlHead = ({ title = "", description = "", children = null }: Props) => {
  console.log("title->", title);
  console.log("description->", description);
  return (
    <div>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {children && children}
    </div>
  );
};
export default HtmlHead;
