import { defaultCollections } from "@/app/hooks/useOwnedNFTs";
import {
  GalleryDisplayMode,
  useGalleryContext,
} from "../../contexts/GalleryContext";
import NFTCollection from "./NFTCollection";
import NFTSlideShow from "./NFTSlideshow";
import styled from "styled-components";
import PickersPanel from "../pickers/PickersPanel";

function NFTGallery() {
  const {
    displayMode,
    ownedNFTs,
    ownedCollections,
    itemSize,
    selectedWallets,
    selectedCollections,
    settingsVisible,
    setSettingsVisible,
    showCollectionTitles,
  } = useGalleryContext();

  const collectionsToDisplay = ownedCollections
    .map((c) => c.address)
    .filter((a) => selectedCollections.includes(a));
  const tokensToDisplay = Object.values(ownedNFTs)
    .flat()
    .filter(
      (t) =>
        selectedWallets.includes(t.owner.ens ? t.owner.ens : t.owner.address) &&
        selectedCollections.includes(t.contract.address)
    )
    .sort((a, b) =>
      defaultCollections.indexOf(b.contract.address) >
        defaultCollections.indexOf(a.contract.address)
        ? -1
        : 1
    );

  function share() {
    const query = new URLSearchParams();
    selectedWallets.forEach((wallet) => query.append("wallet", wallet));
    query.append("display", displayMode);
    query.append("size", itemSize.toString());
    open(`?${query.toString()}`);
  }

  return (
    <>
      {displayMode !== GalleryDisplayMode.Slideshow && (
        <ButtonsPanel>
          <SettingsButton
            $sticky={settingsVisible}
            onClick={() => setSettingsVisible(!settingsVisible)}
          >
            {settingsVisible ? "Hide" : "Show"} Settings
          </SettingsButton>
          <ShareButton onClick={share}>Open share URL</ShareButton>
        </ButtonsPanel>
      )}
      {settingsVisible && <PickersPanel />}

      {displayMode === GalleryDisplayMode.Combined && (
        <NFTCollection nfts={tokensToDisplay} itemWidth={itemSize} />
      )}
      {displayMode === GalleryDisplayMode.ByCollection &&
        collectionsToDisplay.map((collectionAddress) => {
          const tokens = tokensToDisplay.filter(
            (nft) => nft.contract.address === collectionAddress
          );
          return (
            <NFTCollection
              title={
                showCollectionTitles ? tokens[0]?.collection?.name : undefined
              }
              nfts={tokens}
              key={collectionAddress}
              itemWidth={itemSize}
            />
          );
        })}
      {displayMode === GalleryDisplayMode.Slideshow && (
        <NFTSlideShow nfts={tokensToDisplay} interval={1000} />
      )}
    </>
  );
}

const ButtonsPanel = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-items: stretch;
  justify-content: space-between;
`;

const SettingsButton = styled.button<{ $sticky: boolean }>`
  margin: 1em;
  position: ${(props) => (props.$sticky ? "fixed" : "relative")};
  z-index: 2;
`;

const ShareButton = styled.button`
  margin: 1em;
`;

export default NFTGallery;
