import { ConnectButton } from '@rainbow-me/rainbowkit';

import EtherLogo from '@/assets/icons/ether.png';

export const WalletConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');
        return (
          <div
            className="flex w-full"
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="px-8U py-2U text-body border-1/4U w-full rounded-full border-green-400 bg-green-300 text-white hover:border-green-200"
                  >
                    Connect Wallet
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="px-8U py-2U text-body border-1/4U w-full rounded-full border-green-400 bg-green-300 text-white hover:border-green-200"
                  >
                    Wrong network
                  </button>
                );
              }
              return (
                <div className="gap-2U flex w-full flex-col items-center justify-center">
                  <div className="flex w-full items-center justify-between">
                    <div onClick={openChainModal} className="gap-2U flex cursor-pointer items-center">
                      {chain.hasIcon && (
                        <div className="flex size-[50px] items-center justify-center rounded-full bg-black/50">
                          <img alt="ether" src={EtherLogo} className="h-[35px]" />
                        </div>
                      )}
                      <div className="gap-2U flex flex-col">
                        <span className="text-[20px] font-semibold leading-none text-white">Ethereum</span>
                        <span className="text-[20px] leading-none text-white/20">ETH</span>
                      </div>
                    </div>
                    <div className="px-2U py-3U rounded-[4px] bg-green-400/20 leading-none text-[#45B68D]">
                      {account.displayBalance ? account.displayBalance : '0 ETH'}
                    </div>
                  </div>
                  <div onClick={openAccountModal}>
                    <span className="cursor-pointer text-[14px] text-white/50">{account.displayName}</span>
                  </div>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
