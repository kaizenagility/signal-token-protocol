pragma solidity ^0.4.18;

import './zeppelin/math/SafeMath.sol';
import './SignalTokenDatastore.sol';

interface ERC20 {
  function balanceOf(address who) public constant returns (uint);
  function allowance(address owner, address spender) public constant returns (uint);

  function transfer(address to, uint value) public returns (bool ok);
  function transferFrom(address from, address to, uint value) public returns (bool ok);
  function approve(address spender, uint value) public returns (bool ok);

  event Transfer(address indexed from, address indexed to, uint value);
  event Approval(address indexed owner, address indexed spender, uint value);
}

contract SignalTokenProtocol {
  event CampaignCreated(
    address indexed _advertiser,
    string _title,
    uint256 _reward
  );
  event CampaignExecuted(
    uint256 _campaignId,
    address indexed _publisher,
    uint256 _reward
  );

  mapping(uint256 => SignalTokenDatastore.Campaign) public campaigns;
  uint256[] public campaignsTable;

  ERC20 public signalToken;
  SignalTokenDatastore public signalTokenDatastore;

  function SignalTokenProtocol(address _signalToken, address _signalTokenDatastore) public {
    signalToken = ERC20(_signalToken);
    signalTokenDatastore = SignalTokenDatastore(_signalTokenDatastore);
  }

  function getCampaignsCount()
    public
    view
    returns (uint256)
  {
    return campaignsTable.length;
  }

  function createCampaign(
    string title,
    string description,
    string contentUrl,
    uint256 reward,
    uint256 budget
  )
    public
    returns (uint256 campaignId)
  {
    campaignId = signalTokenDatastore.createCampaign(
      title, description, contentUrl, reward, budget
    );
    CampaignCreated(msg.sender, title, reward);

    return campaignId;
  }

  function executeCampaign(uint256 campaignId, address publisher)
    public
    returns (bool)
  {
    var campaign = signalTokenDatastore.getCampaign(campaignId);
    assert(campaign.budget > campaign.reward);

    bool success = signalToken.transferFrom(campaign.advertiser, publisher, campaign.reward);
    if (success) {
      campaign.budget = SafeMath.sub(campaign.budget, campaign.reward);
      CampaignExecuted(campaignId, publisher, campaign.reward);
    }

    return success;
  }
}
