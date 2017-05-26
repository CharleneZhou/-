var gulp = require("gulp");//引入gulp模块
var sass = require("gulp-sass");

gulp.task("sass",function(){
	return gulp.src("../css/*.scss")
			.pipe(sass())
			.pipe(gulp.dest("../css"))
})