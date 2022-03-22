pragma solidity ^0.5;
pragma experimental ABIEncoderV2;

contract Guestbook {
    address public admin = msg.sender;
    mapping(address => User) users;
    address[] usersByAddress;

    struct User {
        string nickName;
        string city;
        string country;
    }  
    struct message{
        address msgowner;
        string mesg;
    }
    message[] public messages;
    // 这个modifier是用来数据的，防止被别人重写  
    modifier onlyAdmin() {
        require(msg.sender == admin);
        _;
    }
    function _indexOf(address badUser, address[] storage accounts)
        internal
        view
        returns (uint256 badUserIndex)
    {
        for (uint256 i = 0; i < accounts.length; i += 1) {
            if (accounts[i] == badUser) {
                return i;
            }
        }
    }
    function removeUser(address badUser) public onlyAdmin {
        delete users[badUser];

        // swap and delete last
        uint256 badUserIndex = _indexOf(badUser, usersByAddress);
        uint256 lastIndex = usersByAddress.length - 1;
        usersByAddress[badUserIndex] = usersByAddress[lastIndex];
        usersByAddress.length--;
    }
    // 这个函数的目的是用来检查usersByAddress下的内容是否为空的
    function _isEmpty(string memory s) internal pure returns (bool) {
        return bytes(s).length == 0;
    }
    // 这个是检查用户是否注册过了
    function _isRegisteredUser(address user) internal view returns (bool) {
        return bytes(users[user].nickName).length != 0;
    }
    // 注册用户
    function registerNewUser(
        // memory事实上是从相应的存储复制过来的，如果是stroage的话，那就是引用过来的
        string memory nickName,
        string memory city,
        string memory country
    ) public {
        require(!_isEmpty(nickName));
        require(!_isRegisteredUser(msg.sender));

        users[msg.sender].nickName = nickName;
        users[msg.sender].city = city;
        users[msg.sender].country = country;

        usersByAddress.push(msg.sender);
    }
    // Post message method
    function postMessage(
        string memory mesg
    ) public {
        require(_isRegisteredUser(msg.sender));
        message memory newMessage;
        newMessage.msgowner = msg.sender;
        newMessage.mesg = mesg;
        messages.push(newMessage);
    }
    // 这个是获取所有用户账号,返回数值目前不确定，猜测是json
    function getUsers() public view returns (address[] memory) {
        return usersByAddress;
    }
    function getMsgs() public view returns(message[] memory){
        return messages;
    }
    // 
    function getUser(address userAddress) public view returns (User memory) {
        return users[userAddress];
    }
}