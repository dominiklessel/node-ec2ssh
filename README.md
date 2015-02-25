# node-ec2ssh

**Warning: Just a quick prototype. May behaves strange / like an asshole.**

SSH into EC2 instances via tags. More or less an exact copy of [facebookarchive/ec2-ssh](https://github.com/facebookarchive/ec2-ssh).

## Install

```
$ npm install -g ec2ssh
```

## Configuration

The module uses the AWS JavaScript SDK internally, so please take a look at: http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html

## Usage

### ec2hosts - Lists instances

```
  Usage: ec2hosts [options] <nameFilter1, nameFilter2, ...>

  Options:

    -h, --help                 output usage information
    -V, --version              output the version number
    -k, --aws-key [key]        Amazon Access Key. Defaults to ~/.aws/credentials -> aws_access_key_id or ENV.AWS_ACCESS_KEY_ID
    -s, --aws-secret [secret]  Amazon Secret Access Key. Defaults to ~/.aws/credentials -> aws_secret_access_key or ENV.AWS_SECRET_ACCESS_KEY
    -r, --region [region]      Amazon EC2 Region. Defaults to `eu-west-1` or ENV.AWS_EC2_REGION
    -t, --tag [tag]            Tag name for searching. Defaults to `Name`
```

### ec2ssh - Connects to instance

```
 Usage: ec2ssh [options] <nameFilter1, nameFilter2, ...>

  Options:

    -h, --help                 output usage information
    -V, --version              output the version number
    -k, --aws-key [key]        Amazon Access Key. Defaults to ~/.aws/credentials -> aws_access_key_id or ENV.AWS_ACCESS_KEY_ID
    -s, --aws-secret [secret]  Amazon Secret Access Key. Defaults to ~/.aws/credentials -> aws_secret_access_key or ENV.AWS_SECRET_ACCESS_KEY
    -r, --region [region]      Amazon EC2 Region. Defaults to `eu-west-1` or ENV.AWS_EC2_REGION
    -t, --tag [tag]            Tag name for searching. Defaults to `Name`
    -u, --user [user]          User used for ssh connection. Defaults to `ubuntu`
```

## TODOs

* Use all available command line options
* Tests
* Proper error handling

## Credits

Inspired by [Instagram Engineering Blog / Simplifying EC2 SSH Connections](http://instagram-engineering.tumblr.com/post/11399488246/simplifying-ec2-ssh-connections)

## License

(The MIT License)

Copyright (c) 2015 Dominik Lessel <dominik@mifitto.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
