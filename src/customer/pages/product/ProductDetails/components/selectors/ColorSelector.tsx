
interface Props {
  colors: any[];
  color: any;
  setColor: (c: any) => void;
}

const ColorSelector: React.FC<Props> = ({ colors, color, setColor }) => {
  if (!colors?.length) return null;

   const activeColor = color ?? colors[0];

  return (
    <div>
      <h4 className="text-xs tracking-wide text-[#4A1F2A] font-semibold">
      Color
    </h4>

    <p className="text-sm font-medium mt-1 text-[#4A1F2A] capitalize">
      {activeColor?.name}
    </p>
      <div className="flex gap-3 mt-2">
        {colors.map((c, i) => (
          <button
            key={i}
            onClick={() => setColor(c)}
            title={c.name}
            className={`w-8 h-8 rounded-full border-2 transition
              ${color?.name === c.name
                ? "border-[#4A1F2A] scale-110"
                : "border-[#E8DCC8]"
              }
            `}
            style={{ backgroundColor: c.hex }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;



// interface Props {
//   colors: any[];
//   color: any;
//   setColor: (c: any) => void;
// }

// const ColorSelector: React.FC<Props> = ({ colors, color, setColor }) => {
//   if (!colors?.length) return null;
// const activeColor = color ?? colors[0];

// return (
//   <div>
//     <h4 className="text-xs tracking-wide text-[#4A1F2A] font-semibold">
//       Color
//     </h4>

//     <p className="text-sm font-medium mt-1 text-[#4A1F2A] capitalize">
//       {activeColor?.name}
//     </p>

//     <div className="flex gap-3 mt-3">
//       {colors.map((c, i) => (
//         <button
//           key={i}
//           onClick={() => setColor(c)}
//           title={`${c.name}`}
//           className={`w-8 h-8 rounded-full border-2 transition
//             ${activeColor?.name === c.name
//               ? "border-[#4A1F2A] scale-110"
//               : "border-[#E8DCC8]"
//             }
//           `}
//           style={{ backgroundColor: c.hex }}
//         />
//       ))}
//     </div>
//   </div>
// );
// };

// export default ColorSelector;
