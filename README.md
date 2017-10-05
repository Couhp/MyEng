## Project MyEng
=============

### Cách hoạt động
Project chia thành 3 branch<br>
Branch là một nhánh lưu quá trình phát triển code

- master : branch cho admin. Các feature chỉ được đưa vào master sau khi đã hoạt động hoàn chỉnh
- develop : branch phát triển tạm thời, chứa bản phát triển ổn định. Merge bởi admin. 
- feature : branch cho member, các member push các bản phát triển lên đây. Khi code hoàn thành, 
yêu cầu admin merge lên develop.Khi một (hoặc nhiều) tính năng hoàn thành, co thể tạo một branch feature mới (pull từ develop phiên bản của các tính năng trước đó đã hoàn thiện)

### Các lệnh cần chú ý :

`$ git pull <url>`<br>
 Cập nhật một thư mục 

 `$ git pull origin <this_branch>`<br>
 Cập nhật branch hiện tại theo this_branch<br>

`$ git add .`<br>Thêm code vào kho

`$ git commit -m "your_comment"`
<br>Commit code lên lịch sử chỉnh sửa

`$ git push origin <branch>`
<br>Push code lên kho origin 

`$ git checkout <branch>`
<br>Chuyển branch hiện tại (Thường thì mọi người làm việc trên branch feature)

<br>
=============

# Good luck 

