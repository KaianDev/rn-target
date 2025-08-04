import { StyleSheet } from "react-native"
import { colors, fontFamily, fontSize } from "@/theme"

export const styles = StyleSheet.create({
  container: {
    height: 72,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingBottom: 16,
  },
  content: {
    flex: 1,
    gap: 6,
  },
  name: {
    fontSize: fontSize.sm,
    color: colors.black,
    fontFamily: fontFamily.medium,
  },
  status: {
    fontSize: fontSize.xxs,
    color: colors.gray[500],
    fontFamily: fontFamily.regular,
  },
})
