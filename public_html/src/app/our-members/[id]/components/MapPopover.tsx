type MapPopoverProps = {
  src?: string;
};

const MapPopover = ({ src }: MapPopoverProps) => {
  return src && <iframe src={src} width="380" height="480"></iframe>;
};

export default MapPopover;
