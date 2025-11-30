import { useGalleryContext } from "@/app/contexts/GalleryContext";
import { useModalContext } from "@/app/contexts/ModalContext";
import { NFT } from "@/app/hooks/useOwnedNFTs";
import { NftTokenType } from "alchemy-sdk";
import styled from "styled-components";

const NFTItem = ({ width, nft }: { width?: number | undefined; nft: NFT }) => {
  const { setModalItem } = useModalContext();
  const { itemSize } = useGalleryContext();
  const image = nft?.image.originalUrl;

  if (!image) {
    return null;
  }

  return (
    <Containter $itemWidth={width}>
      <ItemIcon
        src={image}
        $itemWidth={width}
        onClick={() => {
          setModalItem(nft);
        }}
      />
      {nft.tokenType === NftTokenType.ERC1155 && itemSize > 100 && (
        <Count $itemWidth={width}>
          <CountLabel $itemWidth={width}>{nft.balance}</CountLabel>
        </Count>
      )}
    </Containter>
  );
};

export default NFTItem;

const Containter = styled.div<{ $itemWidth: number | undefined }>`
  position: relative;
  width: ${(props) => (props.$itemWidth ? `${props.$itemWidth}px` : "100vh")};
  height: ${(props) => (props.$itemWidth ? `${props.$itemWidth}px` : "100vh")};
`;

const ItemIcon = styled.img<{ $itemWidth: number | undefined }>`
  cursor: pointer;

  width: ${(props) => (props.$itemWidth ? `${props.$itemWidth}px` : "100vh")};
  height: ${(props) => (props.$itemWidth ? `${props.$itemWidth}px` : "100vh")};

  object-fit: contain;
  image-rendering: pixelated;
  aspect-ratio: 1;
`;

const Count = styled.div<{ $itemWidth: number | undefined }>`
  position: absolute;
  top: ${(props) => `${(props.$itemWidth ?? 0) / 15}px`};
  right: ${(props) => `${(props.$itemWidth ?? 0) / 15}px`};

  background-color: #00000055;
`;

const CountLabel = styled.div<{ $itemWidth: number | undefined }>`
  color: #ccc;

  padding-left: ${(props) => `${(props.$itemWidth ?? 0) / 15}px`};
  padding-right: ${(props) => `${(props.$itemWidth ?? 0) / 15}px`};
  padding-top: ${(props) => `${(props.$itemWidth ?? 0) / 30}px`};
  padding-bottom: ${(props) => `${(props.$itemWidth ?? 0) / 30}px`};
  
  font-size: ${(props) => `${(props.$itemWidth ?? 0) / 10}px`};
`;
