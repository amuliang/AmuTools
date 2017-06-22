define(["@defineClass", "@ModelBase"], function(defineClass, base) {
/*************************************************************************************************************/
const { ModelBase, ModelColumn } = base;
/************** 常用字段类,必须继承ModelColumn **************************************************************/
const StringColumn = defineClass(function StringColumn(name, size) {
    this.name = name;
    this.size = size;
    this.__init__();
}).extend(ModelColumn).create();

const SexColumn = defineClass(function SexColumn(name) {
    this.name = name;
    this.options = ["男", "女"];
    this.__init__();
}).extend(ModelColumn).create();

const PhotoColumn = defineClass(function SexColumn(name) {
    this.name = name;
    this.check = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    this.__init__();
}).extend(ModelColumn).create();



/************* 实体类,必须继承ModelBase ******************************************************/
/**** User ***/
const User = defineClass(function User(data) {
    this.__init__();
    this.applyDefaultValue(data);

}).staticProps({
    TableName: { value: "user", enumerable: false },
    Name: new StringColumn("name", 50),
    Sex: new SexColumn("sex"),
    Phone: new PhotoColumn("phone"),

}, { configurable: false, writable: false }).extend(ModelBase).create();



/************ 测试 ******************************************************/
user = new User();
var result;

result = User.Name.format("amuliang");
if(result.error) console.log(result.error);
else user.Name = result.value;

result = User.Sex.format("man");
if(result.error) console.log(result.error);
else user.Sex = result.value;

result = User.Phone.format("123");
if(result.error) console.log(result.error);
else user.Phone = result.value;

console.log(JSON.stringify(user));
/*************************************************************************************************************/  
});