// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Pass is ERC721, ERC721Enumerable, ERC721URIStorage, Pausable, Ownable {
    using Counters for Counters.Counter;
    uint256 public MAX_SUPPLY = 1000000;
    // uint256 public MINT_PRICE = 0.05 ether;
    mapping(uint256 => string) public tokenIdtoEvent;
    mapping(string => uint256) public maxAttendees;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Pass", "PS") {
        _tokenIdCounter.increment();
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(address to, string memory uri,string memory mongoEventURI) public payable {
        uint256 tokenId = _tokenIdCounter.current();
        require(tokenId <= MAX_SUPPLY,"Cannot mint more tickets");
        // require(msg.value >= MINT_PRICE,"Minimum Mint price must me satisfied");
        require(maxAttendees[mongoEventURI] > 0,"No tickets left");
        _tokenIdCounter.increment();
        tokenIdtoEvent[tokenId] = mongoEventURI;
        maxAttendees[mongoEventURI]--; 
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    // The following functions are overrides required by Solidity.

    function withdraw() public onlyOwner (){
        require(address(this).balance > 0,"Balance is zero");
        payable(owner()).transfer(address(this).balance);
    }

    function startTicketSale(string memory mongoEventURI,uint256 maxAttendeesNumber) public {
        maxAttendees[mongoEventURI] = maxAttendeesNumber;
    }

    function getRemainingSeats(string memory mongoEventURI) public view returns(uint256) {
        return maxAttendees[mongoEventURI];
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}