# Usage "myEng" application

## Installation

## `Node Js` :<br>

Ubuntu : [https://nodejs.org/en/download/package-manager/]
```
$ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

Window : Download and install from [https://nodejs.org/en/download/]<br>
Checking installation 
```
$ node --version
> v7.10.1
```

## `MongoDb` :<br>
Ubuntu :
```
$ sudo apt-get install -y mongodb-org
```
Checking Installation 
```
$ mongo --version
> MongoDB shell version v3.4.6
```

Window :
Download and install from : https://docs.mongodb.com/v3.4/tutorial/install-mongodb-on-windows/
<br>or (if the above link is failed) https://drive.google.com/open?id=1_xf6M9EwlW3ltXdhXQFmEfP8RXDjw6ai 

## `Redis` : <br>
Ubuntu : <br>https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-redis-on-ubuntu-16-04  
```
$ sudo apt-get update
$ sudo apt-get install build-essential tcl
$ cd /tmp
$ curl -O http://download.redis.io/redis-stable.tar.gztar xzvf 
$ redis-stable.tar.gz
$ cd redis-stable
$ make
$ sudo make install
```

Window : Download and install form https://github.com/rgl/redis/downloads

## Now we will run our application :
### Ubuntu :

Start `MongoDB` :
```
$ mongod
```
result:
```
2017-12-08T07:44:58.280+0700 I CONTROL  [initandlisten] MongoDB starting : pid=1032 port=27017 dbpath=C:\data\db\ 64-bit host=D
2017-12-08T07:44:58.281+0700 I CONTROL  [initandlisten] targetMinOS: Windows 7/Windows Server 2008 R2
2017-12-08T07:44:58.281+0700 I CONTROL  [initandlisten] db version v3.2.10
2017-12-08T07:44:58.281+0700 I CONTROL  [initandlisten] git version: 79d9b3ab5ce20f51c272b4411202710a082d0317
2017-12-08T07:44:58.281+0700 I CONTROL  [initandlisten] OpenSSL version: OpenSSL 1.0.1t-fips  3 May 2016
2017-12-08T07:44:58.282+0700 I CONTROL  [initandlisten] allocator: tcmalloc
2017-12-08T07:44:58.282+0700 I CONTROL  [initandlisten] modules: none
2017-12-08T07:44:58.282+0700 I CONTROL  [initandlisten] build environment:
2017-12-08T07:44:58.283+0700 I CONTROL  [initandlisten]     distmod: 2008plus-ssl
2017-12-08T07:44:58.283+0700 I CONTROL  [initandlisten]     distarch: x86_64
2017-12-08T07:44:58.283+0700 I CONTROL  [initandlisten]     target_arch: x86_64
2017-12-08T07:44:58.283+0700 I CONTROL  [initandlisten] options: {}
2017-12-08T07:44:58.283+0700 I -        [initandlisten] Detected data files in C:\data\db\ created by the 'wiredTiger' storage engine, so setting the active storage engine to 'wiredTiger'.
2017-12-08T07:44:58.285+0700 I STORAGE  [initandlisten] wiredtiger_open config: create,cache_size=1G,session_max=20000,eviction=(threads_max=4),config_base=false,statistics=(fast),log=(enabled=true,archive=true,path=journal,compressor=snappy),file_manager=(close_idle_time=100000),checkpoint=(wait=60,log_size=2GB),statistics_log=(wait=0),
2017-12-08T07:44:59.290+0700 I NETWORK  [HostnameCanonicalizationWorker] Starting hostname canonicalization worker
2017-12-08T07:44:59.290+0700 I FTDC     [initandlisten] Initializing full-time diagnostic data capture with directory 'C:/data/db/diagnostic.data'
2017-12-08T07:44:59.298+0700 I NETWORK  [initandlisten] waiting for connections on port 27017
```
Import Data to MongoDB:
```
$ mongorestore --db myEng path/to/myEng_db
```
Start `Redis` :
```
$ redis-server
```
result:
```
                _._
           _.-``__ ''-._
      _.-``    `.  `_.  ''-._           Redis 3.0.503 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._
 (    '      ,       .-`  | `,    )     Running in standalone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379
 |    `-._   `._    /     _.-'    |     PID: 9544
  `-._    `-._  `-./  _.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |           http://redis.io
  `-._    `-._`-.__.-'_.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |
  `-._    `-._`-.__.-'_.-'    _.-'
      `-._    `-.__.-'    _.-'
          `-._        _.-'
              `-.__.-'

[9544] 08 Dec 07:46:13.279 # Server started, Redis version 3.0.503
[9544] 08 Dec 07:46:13.279 * DB loaded from disk: 0.000 seconds
[9544] 08 Dec 07:46:13.279 * The server is now ready to accept connections on port 6379
```
Run app :
```
$ cd path/to/MyEng
$ node app.js
```

### Windows
Start `MongoDB`
find mongoDB folder : C:\Program Files\MongoDB\Server\3.2\bin
at that CMD, run:
```
mongod.exe
```
result:
```
2017-12-08T07:44:58.280+0700 I CONTROL  [initandlisten] MongoDB starting : pid=1032 port=27017 dbpath=C:\data\db\ 64-bit host=D
2017-12-08T07:44:58.281+0700 I CONTROL  [initandlisten] targetMinOS: Windows 7/Windows Server 2008 R2
2017-12-08T07:44:58.281+0700 I CONTROL  [initandlisten] db version v3.2.10
2017-12-08T07:44:58.281+0700 I CONTROL  [initandlisten] git version: 79d9b3ab5ce20f51c272b4411202710a082d0317
2017-12-08T07:44:58.281+0700 I CONTROL  [initandlisten] OpenSSL version: OpenSSL 1.0.1t-fips  3 May 2016
2017-12-08T07:44:58.282+0700 I CONTROL  [initandlisten] allocator: tcmalloc
2017-12-08T07:44:58.282+0700 I CONTROL  [initandlisten] modules: none
2017-12-08T07:44:58.282+0700 I CONTROL  [initandlisten] build environment:
2017-12-08T07:44:58.283+0700 I CONTROL  [initandlisten]     distmod: 2008plus-ssl
2017-12-08T07:44:58.283+0700 I CONTROL  [initandlisten]     distarch: x86_64
2017-12-08T07:44:58.283+0700 I CONTROL  [initandlisten]     target_arch: x86_64
2017-12-08T07:44:58.283+0700 I CONTROL  [initandlisten] options: {}
2017-12-08T07:44:58.283+0700 I -        [initandlisten] Detected data files in C:\data\db\ created by the 'wiredTiger' storage engine, so setting the active storage engine to 'wiredTiger'.
2017-12-08T07:44:58.285+0700 I STORAGE  [initandlisten] wiredtiger_open config: create,cache_size=1G,session_max=20000,eviction=(threads_max=4),config_base=false,statistics=(fast),log=(enabled=true,archive=true,path=journal,compressor=snappy),file_manager=(close_idle_time=100000),checkpoint=(wait=60,log_size=2GB),statistics_log=(wait=0),
2017-12-08T07:44:59.290+0700 I NETWORK  [HostnameCanonicalizationWorker] Starting hostname canonicalization worker
2017-12-08T07:44:59.290+0700 I FTDC     [initandlisten] Initializing full-time diagnostic data capture with directory 'C:/data/db/diagnostic.data'
2017-12-08T07:44:59.298+0700 I NETWORK  [initandlisten] waiting for connections on port 27017
```

Import Data to MongoDB:
RUN CMD as Administrator and find C:\Programs File\MongoDB\Server\3.2\bin
and run:
```
mongorestore.exe --db myEng path/to/myEng_db
```
Start `Redis`
<br>Open CMD as Administrator 
RUN: Find folder Redis (C:\Program Files\Redis or folder redis at Desktop(if exist)) and run redis-server.exe path/to/conf/redis.conf (maybe got error, please contact dangductungcfc@gmail.com or use ubuntu)
result:
```
                _._
           _.-``__ ''-._
      _.-``    `.  `_.  ''-._           Redis 3.0.503 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._
 (    '      ,       .-`  | `,    )     Running in standalone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379
 |    `-._   `._    /     _.-'    |     PID: 9544
  `-._    `-._  `-./  _.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |           http://redis.io
  `-._    `-._`-.__.-'_.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |
  `-._    `-._`-.__.-'_.-'    _.-'
      `-._    `-.__.-'    _.-'
          `-._        _.-'
              `-.__.-'

[9544] 08 Dec 07:46:13.279 # Server started, Redis version 3.0.503
[9544] 08 Dec 07:46:13.279 * DB loaded from disk: 0.000 seconds
[9544] 08 Dec 07:46:13.279 * The server is now ready to accept connections on port 6379
```

Run app:
```
cd path/to/MyEng
node app.js
```
result:
```
C:\Users\Dell\Desktop\MyEng>node app.js
Server is listening at port 8080
Connected to redis
[i] Connected successfully to mongodb
Use redis db2
```
HOST : localhost
PORT : 8080

If you need more info, please contact : dangductungcfc@gmail.com <br/>
Source code at : https://github.com/Couhp/MyEng